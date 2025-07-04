package com.example.jwt_rest.dtos;

import com.example.jwt_rest.models.User;

// import com.example.jwt_rest.models.User;

// import lombok.AllArgsConstructor;
import lombok.Data;

@Data
// @AllArgsConstructor
public class AuthResponse {
    private String roleToken;
    private String token;

    public AuthResponse(String roleToken, String token) {
        this.roleToken = roleToken;
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRoleToken() {
        return roleToken;
    }

    public void setRoleToken(String roleToken) {
        this.roleToken = roleToken;
    }
}