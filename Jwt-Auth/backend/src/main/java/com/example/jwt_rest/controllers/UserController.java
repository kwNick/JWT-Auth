package com.example.jwt_rest.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal; //this library is important
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails; //this library is important
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.jwt_rest.models.User;
import com.example.jwt_rest.repositories.UserRepository;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll().stream()
            .collect(Collectors.toList()));
    }

    @GetMapping("/profile")
    public ResponseEntity<Optional<User>> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        // userDetails.getUsername() will give the logged-in user's username
        final Optional<User> user = userRepository.findByUsername(userDetails.getUsername());

        // if (user.isEmpty()) {
        //     return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        // }
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUserData(HttpServletResponse response, @AuthenticationPrincipal UserDetails userDetails) {
        // String username = getCurrentUsername();
        Optional<User> user = userRepository.findByUsername(userDetails.getUsername());

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Optional: Also delete related data like orders, carts, etc.
        ResponseCookie deleteRefreshCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("None")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, deleteRefreshCookie.toString());

        SecurityContextHolder.clearContext();

        userRepository.delete(user.get());
        
        return ResponseEntity.ok("Your personal data has been deleted.");
    }
}