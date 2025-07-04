package com.example.jwt_rest.dtos;

import com.example.jwt_rest.models.User;

// import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
// @AllArgsConstructor
public class RegisterResponse {
    private String roleToken;
    private String token;
    
    public RegisterResponse(String roleToken, String token) {
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
