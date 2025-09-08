package com.example.jwt_rest.dtos;

import com.example.jwt_rest.models.User;

public class RefreshResponse {
    // private String roleToken;
    // private String token;
    private String fullToken;
    
    public RefreshResponse(String fullToken) {
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
