package com.example.jwt_rest.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jwt_rest.models.Shop;
import com.example.jwt_rest.models.User;

// ShopRepository.java
public interface ShopRepository extends JpaRepository<Shop, Long> {

    // Option 1: Find shops by User entity
    List<Shop> findByUser(User user);

    // Option 2: Find shops by user ID
    List<Shop> findByUserId(Long userId);

    // Option 3: Find shops by user entity and shop name
    boolean existsByUserAndName(User user, String name);
}
