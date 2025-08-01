package com.example.jwt_rest.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jwt_rest.models.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
    Optional<Role> findByName(String name);
}
