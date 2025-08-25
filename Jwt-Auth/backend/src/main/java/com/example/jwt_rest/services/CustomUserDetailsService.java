package com.example.jwt_rest.services;

// import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails; //this library is important
import org.springframework.security.core.userdetails.UserDetailsService; //this library is important
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.jwt_rest.models.User;
import com.example.jwt_rest.repositories.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repo.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<GrantedAuthority> authorities = user.getRoles().stream()
            .map(role -> new SimpleGrantedAuthority(role.getName()))
            .collect(Collectors.toList());
        
            if (authorities.isEmpty()) {
            authorities.add(new SimpleGrantedAuthority("ROLE_USER")); // Default role if none assigned
        }

        return new org.springframework.security.core.userdetails.User(
            user.getUsername(), user.getPassword(), authorities
        );
    };
    
    // public User registerNewUser(User user) throws RuntimeException {
    //     if (repo.existsByUsername(user.getUsername())) {
    //         throw new RuntimeException("Username already taken.");
    //     }
    //     if (repo.existsByEmail(user.getEmail())) {
    //         throw new RuntimeException("Email already taken.");
    //     }
    //     if (user.getUsername() == null || user.getUsername().isEmpty()) {
    //         throw new RuntimeException("Username cannot be empty.");
    //     }
        
    //     user.setPassword(passwordEncoder.encode(user.getPassword()));
    //     return repo.save(user);
    // } //seems like because we define passwordEncoder in security config there is a circular reference when calling it here so we made a new userService class for registration
    
}
