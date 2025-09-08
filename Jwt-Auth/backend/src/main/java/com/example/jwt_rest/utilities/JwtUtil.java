package com.example.jwt_rest.utilities;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.example.jwt_rest.models.Role;

import io.jsonwebtoken.Jwts; //this is the important library to use here
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

    private final String SECRET = "secret-key-making-it-very-strong"; // Use a strong secret key in production

    private Key getSigningKey() {
        byte[] secretBytes = SECRET.getBytes();
        return new SecretKeySpec(secretBytes, SignatureAlgorithm.HS256.getJcaName());
    }

    public String generateFullToken(String userId, String username, Set<Role> roles) { // For one token, we can have multiple claims
        long now = System.currentTimeMillis();
        long expiry = now + (1000 * 60 * 3); // 15 min

        List<String> roleNames = roles.stream()
                                  .map(Role::getName)
                                  .collect(Collectors.toList());

        return Jwts.builder()
                .setSubject(userId)                  // "sub" claim
                .claim("username", username)         // custom claim
                .claim("roles", roleNames)               // custom claim
                .setIssuedAt(new Date(now))          // "iat"
                .setExpiration(new Date(expiry))     // "exp"
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)   // sign with secret
                .compact();
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 3)) // 15 minutes
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    
    public String generateRefreshToken(String userId, String username) {
        return Jwts.builder()
            .setSubject(userId)
            .claim("username", username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 1 * 1)) // 1 hour
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    /**
     * Generates a JWT token containing the roles of the user.
     *
     * @param roles Set of roles to be included in the token.
     * @return A JWT token as a String.
     */
    //why is it using claim here instead of setSubject?
    //because it is not just a single subject, it is a set of roles
    public String generateRolesToken(Set<Role> roles) {
    List<String> roleNames = roles.stream()
                                  .map(Role::getName)
                                  .collect(Collectors.toList());

    return Jwts.builder()
        .claim("roles", roleNames)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 3)) // 15 minutes
        .signWith(getSigningKey(), SignatureAlgorithm.HS256)
        .compact();
    }

    public String extractUserId(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String extractUsername(String token) {
    return Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody()
            .get("username", String.class);
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }
}
