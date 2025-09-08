package com.example.jwt_rest.dtos;

import com.example.jwt_rest.models.User;

// import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
// @AllArgsConstructor
public class RegisterResponse {
    // private String roleToken;
    // private String token;
    private String fullToken;
    
    public RegisterResponse(String fullToken) {
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
