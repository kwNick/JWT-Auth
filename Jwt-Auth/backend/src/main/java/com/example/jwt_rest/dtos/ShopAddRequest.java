package com.example.jwt_rest.dtos;

import lombok.Data;

@Data
public class ShopAddRequest {
    private String name;
    private String location;

    public ShopAddRequest(String name, String location) {
        this.name = name;
        this.location = location;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
