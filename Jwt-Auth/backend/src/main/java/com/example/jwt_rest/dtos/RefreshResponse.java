package com.example.jwt_rest.dtos;

import com.example.jwt_rest.models.User;

public class RefreshResponse {
    private String roleToken;
    private String token;
    
    public RefreshResponse(String roleToken, String token) {
        this.roleToken = roleToken;
        this.token = token;
    }
    
    public String getRoleToken() {
        return roleToken;
    }

    public void setRoleToken(String roleToken) {
        this.roleToken = roleToken;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
