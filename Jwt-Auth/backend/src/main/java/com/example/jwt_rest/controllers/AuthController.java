package com.example.jwt_rest.controllers;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

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
import org.springframework.web.bind.annotation.CookieValue;
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

            // final UserDetails user = userDetailsService.loadUserByUsername(request.getUsername()); //userDetailsService returns UserDetails object: username, password, authorities
            final User resultUser = userService.findByUsername(request.getUsername()); //userService returns the User model
            
            final String fullToken = jwtUtil.generateFullToken(resultUser.getId().toString(), resultUser.getUsername(), resultUser.getRoles());
            
            // final String accessToken = jwtUtil.generateToken(request.getUsername());
            // final String rolesToken = jwtUtil.generateRolesToken(resultUser.getRoles());

            final String refreshToken = jwtUtil.generateRefreshToken(resultUser.getId().toString(), request.getUsername());
            ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken) //Spring’s ResponseCookie *newer, Recommended way in modern spring apps
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(1 * 1 * 60 * 60)
                .sameSite("None") // Allows cross-site cookies; for dev, set to "Lax" or "Strict" if needed
                // .domain("jwt-auth.duckdns.org") // optional, but makes it explicit
                .build();
            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());      // When you call cookie.toString(), Spring generates a properly formatted Set-Cookie header

            return ResponseEntity.ok(new AuthResponse(fullToken));

        } else {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
        }

    }

    // Works perfect over postman, but in production, the cookie is not being sent back to the server
    // when the client makes a request to the server, so the refresh token is not being validated.
    
    //     Why your refresh fails today
    // Because you’re calling /refresh from a server environment (Next.js RSC / server action) where the browser’s cookies don’t exist.
    // The backend is correct: refreshToken is null.

    //Try this ---
    // public ResponseEntity<String> getProfile(@CookieValue(value = "refreshToken", required = false) String refreshToken) {
    @PostMapping("/refresh")
    public ResponseEntity<RefreshResponse> refreshToken(@CookieValue(value="refreshToken", required=false) String refreshToken, HttpServletRequest request, HttpServletResponse response) { 

        final String username = jwtUtil.extractUsername(refreshToken);
        final UserDetails user = userDetailsService.loadUserByUsername(username);
        final User resultUser = userService.findByUsername(username);

        if (refreshToken == null || !jwtUtil.validateToken(refreshToken, user)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        final String fullToken = jwtUtil.generateFullToken(resultUser.getId().toString(), resultUser.getUsername(), resultUser.getRoles());

        // final String newAccessToken = jwtUtil.generateToken(username);
        // final String newRoleToken = jwtUtil.generateRolesToken(resultUser.getRoles());

        return ResponseEntity.ok(new RefreshResponse(fullToken));
    }

    @PostMapping("/register-refresh")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request, HttpServletRequest request_1, HttpServletResponse response) {

        String ip = request_1.getRemoteAddr();
        Bucket bucket = resolveBucket(ip);
        if (bucket.tryConsume(1)) {
            final User user = userService.registerNewUser(request);
            final User resultUser = userService.findByUsername(request.getUsername());

            final String fullToken = jwtUtil.generateFullToken(resultUser.getId().toString(), resultUser.getUsername(), resultUser.getRoles());

            // final String accessToken = jwtUtil.generateToken(user.getUsername());
            // final String rolesToken = jwtUtil.generateRolesToken(resultUser.getRoles());

            final String refreshToken = jwtUtil.generateRefreshToken(resultUser.getId().toString(), user.getUsername());  // Set refresh token in cookie //using ResponseCookie
            ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(1 * 1 * 60 * 60) //1 hour (old value: 5 days)
                .sameSite("None")
                .build();
            response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

            return ResponseEntity.ok(new RegisterResponse(fullToken));

        } else {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
        }
    }

    @PostMapping("/logout-refresh")
    public ResponseEntity<String> logout(HttpServletResponse response) {

        // Invalidate the refresh token cookie
        ResponseCookie cookie = ResponseCookie.from("refreshToken", "")
            .httpOnly(true)
            .secure(true) // same as when you set it
            .path("/")    // must match
            .maxAge(0)    // expire immediately
            .sameSite("None") // must match
            .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        SecurityContextHolder.clearContext();

        return ResponseEntity.ok("Logged out successfully");
    }

}