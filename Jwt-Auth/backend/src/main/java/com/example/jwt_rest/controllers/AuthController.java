package com.example.jwt_rest.controllers;

import java.time.Duration;
import java.util.Arrays;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.jwt_rest.dtos.AuthRequest;
import com.example.jwt_rest.dtos.AuthResponse;
import com.example.jwt_rest.dtos.RefreshResponse;
import com.example.jwt_rest.dtos.RegisterRequest;
import com.example.jwt_rest.dtos.RegisterResponse;
import com.example.jwt_rest.models.User;
import com.example.jwt_rest.services.UserService;
import com.example.jwt_rest.utilities.JwtUtil;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();
    @SuppressWarnings("deprecation")
    private Bucket resolveBucket(String ip) {           //For rate limiting ips from making too many requests
        Bandwidth limit = Bandwidth.simple(12, Duration.ofMinutes(2));
        return buckets.computeIfAbsent(ip, k -> Bucket4j.builder()
            .addLimit(limit)
            .build());
        // return buckets.computeIfAbsent(ip, k -> Bucket4j.builder()
        //     .addLimit(Bandwidth.simple(12, Duration.ofMinutes(2)))
        //     .build());
    }

    // For access token and refresh token
    @PostMapping("/login-refresh")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request, HttpServletRequest request_1, HttpServletResponse response) {
            
        String ip = request_1.getRemoteAddr();
        Bucket bucket = resolveBucket(ip);
        if (bucket.tryConsume(1)) {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            final String accessToken = jwtUtil.generateToken(request.getUsername());
            final String refreshToken = jwtUtil.generateRefreshToken(request.getUsername());

            final User resultUser = userService.findByUsername(request.getUsername());

            // final Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
                // refreshCookie.setHttpOnly(true);
                // refreshCookie.setPath("/");
                // refreshCookie.setSecure(false);
                // refreshCookie.setDomain("localhost");
                // refreshCookie.setMaxAge(1 * 1 * 60 * 30); // 30 minutes
                // refreshCookie.setSameSite("None"); //doesnt support SameSite attribute in Java 8
                // response.addCookie(refreshCookie); // adds cookie to the response but does not support SameSite attribute
            
            // Manually add SameSite attribute
            // response.setHeader("Set-Cookie", String.format("%s=%s; Path=/; HttpOnly; MaxAge=3600; SameSite=None; Secure=false", refreshCookie.getName(), refreshCookie.getValue()));

            // String cookie = String.format(
            //     "refreshToken=%s; HttpOnly; Path=/; Max-Age=3600; SameSite=None; Secure",
            //     refreshToken
            // );
            // response.setHeader("Set-Cookie", cookie); //what is the difference between setheader and addheader?

            ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true) // Secure = false in dev, true in prod with HTTPS
                .path("/")
                .maxAge(3600)
                .sameSite("None") // Allows cross-site cookies; for dev, set to "Lax" or "Strict" if needed
                .build();
            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            // final String roles = resultUser.getRoles();
            final String rolesToken = jwtUtil.generateRolesToken(resultUser.getRoles());

            return ResponseEntity.ok(new AuthResponse(rolesToken, accessToken));
        } else {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
        }

    }

    // Works perfect over postman, but in production, the cookie is not being sent back to the server
    // when the client makes a request to the server, so the refresh token is not being validated.
    // Needs both the api and the frontend to have https configured properly.
    @PostMapping("/refresh")
    public ResponseEntity<RefreshResponse> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        final String refreshToken = Optional.ofNullable(request.getCookies())   //Optional.ofNullable(cookies) wraps cookies, even if it’s null.
            .map(Arrays::stream)    //If cookies is not null, .map(Arrays::stream) turns it to a stream.
            .orElseGet(Stream::empty) //If cookies is null, return an empty stream to avoid null pointer exception
            .filter(c -> c.getName().equals("refreshToken"))
            .findFirst()
            .map(Cookie::getValue)
            .orElse(null); 

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
        // final Cookie[] cookies = request.getCookies();
        // // System.out.println("Cookies: " + Arrays.toString(cookies));
        
        // final String refreshToken = (cookies == null) ? null : Arrays.stream(cookies) // java.lang.NullPointerException: Cannot read the array length because "array" is null
        //     .filter(c -> c.getName().equals("refreshToken"))
        //     .findFirst()
        //     .map(Cookie::getValue)
        //     .orElse(null);
        System.out.println("Refresh Token: " + refreshToken);

        final String username = jwtUtil.extractUsername(refreshToken);
        final UserDetails user = userDetailsService.loadUserByUsername(username);

        if (refreshToken == null || !jwtUtil.validateToken(refreshToken, user)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        final String newAccessToken = jwtUtil.generateToken(username);
        final User resultUser = userService.findByUsername(username);
        final String newRoleToken = jwtUtil.generateRolesToken(resultUser.getRoles());

        return ResponseEntity.ok(new RefreshResponse(newRoleToken, newAccessToken));
    }

    @PostMapping("/register-refresh")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request, HttpServletRequest request_1, HttpServletResponse response) {

        String ip = request_1.getRemoteAddr();
        Bucket bucket = resolveBucket(ip);
        if (bucket.tryConsume(1)) {
            final User user = userService.registerNewUser(request);

            // Generate tokens
            final String accessToken = jwtUtil.generateToken(user.getUsername());
            final String refreshToken = jwtUtil.generateRefreshToken(user.getUsername());

            final User resultUser = userService.findByUsername(request.getUsername());

            final Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
                refreshCookie.setHttpOnly(true);
                refreshCookie.setSecure(true); // Set to true if using HTTPS
                refreshCookie.setPath("/");
                refreshCookie.setMaxAge(1 * 1 * 60 * 60); // 1 hour
                response.addCookie(refreshCookie);

            // Set refresh token in cookie //using ResponseCookie
            // ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", refreshToken)
            //     .httpOnly(true)
            //     .secure(true)
            //     .path("/")
            //     .maxAge(5 * 24 * 60 * 60)
            //     .build();

            // response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

            // final String roles = resultUser.getRoles();
            final String rolesToken = jwtUtil.generateRolesToken(resultUser.getRoles());

            return ResponseEntity.ok(new RegisterResponse(rolesToken, accessToken));

        } else {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
        }
    }

    @PostMapping("/logout-refresh")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        // Invalidate the refresh token cookie
        final Cookie deleteRefreshCookie = new Cookie("refreshToken", "");
            deleteRefreshCookie.setHttpOnly(true);
            deleteRefreshCookie.setSecure(true);
            deleteRefreshCookie.setPath("/");
            deleteRefreshCookie.setMaxAge(0);// <--- deletes the cookie
            response.addCookie(deleteRefreshCookie);

        SecurityContextHolder.clearContext();

        return ResponseEntity.ok("Logged out successfully");
    }

}