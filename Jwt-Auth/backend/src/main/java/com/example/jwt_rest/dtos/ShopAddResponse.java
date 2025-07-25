package com.example.jwt_rest.dtos;

import lombok.Data;

@Data
public class ShopAddResponse {
    private final String shopName;
    private final String shopLocation;
    private final String username;

    public ShopAddResponse(String shopName, String shopLocation, String username) {
        this.shopName = shopName;
        this.shopLocation = shopLocation;
        this.username = username;
    }

    public String getShopName() {
        return shopName;
    }

    public String getShopLocation() {
        return shopLocation;
    }

    public String getUsername() {
        return username;
    }

}
