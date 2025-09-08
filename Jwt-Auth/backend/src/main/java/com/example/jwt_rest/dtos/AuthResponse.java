package com.example.jwt_rest.dtos;

import lombok.Data;

@Data
// @AllArgsConstructor
public class AuthResponse {
    // private String roleToken;
    // private String token;
    private String fullToken;

    public AuthResponse( String fullToken) {
        // this.roleToken = roleToken;
        // this.token = token;
        this.fullToken = fullToken;
    }

    public String getFullToken() {
        return fullToken;
    }

    public void setFullToken(String fullToken) {
        this.fullToken = fullToken;
    }
}