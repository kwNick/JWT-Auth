package com.example.jwt_rest.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.jwt_rest.dtos.RegisterRequest;
import com.example.jwt_rest.models.Role;
import com.example.jwt_rest.models.User;
import com.example.jwt_rest.repositories.RoleRepository;
import com.example.jwt_rest.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepo;

    @Autowired
    private final RoleRepository roleRepository;
    
    @Autowired
    private final PasswordEncoder passwordEncoder;
    
    public UserService(UserRepository userRepo, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }
    

    public User registerNewUser(RegisterRequest request) throws RuntimeException {
        if (userRepo.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken.");
        }
        if (userRepo.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already taken.");
        }
        if (request.getUsername() == null || request.getUsername().isEmpty()) {
            throw new RuntimeException("Username cannot be empty.");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        // user.setRoles(List.of("ROLE_USER")); // or however your roles are stored, ex. Set
        Role defaultRole = roleRepository.findByName("ROLE_USER")
            .orElseThrow(() -> new RuntimeException("Default role not found"));
        
        user.setRoles(Set.of(defaultRole));

        return userRepo.save(user);

        // userRepo.save(user);
        // return new org.springframework.security.core.userdetails.User(
        //     user.getUsername(), user.getPassword(), user.getEmail(), new ArrayList<>()
        // );
    };

    public User findByUsername(String username) {
        return userRepo.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }


    //this is new ...
    // public void deleteUser(String username) {
    //     User user = findByUsername(username);
    //     userRepo.delete(user);
    // }
}
