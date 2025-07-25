package com.example.jwt_rest.controllers;

// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.jwt_rest.dtos.ShopAddRequest;
import com.example.jwt_rest.dtos.ShopAddResponse;
import com.example.jwt_rest.models.Shop;
import com.example.jwt_rest.models.User;
import com.example.jwt_rest.services.ShopService;
import com.example.jwt_rest.services.UserService;

@RestController
@RequestMapping("/shops")
public class ShopController {
    private final ShopService shopService;
    private final UserService userService;

    public ShopController(ShopService shopService, UserService userService) {
        this.shopService = shopService;
        this.userService = userService;
    }
    
    @PostMapping("/addShop")
    public ResponseEntity<ShopAddResponse> getAddShop(@RequestBody ShopAddRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByUsername(userDetails.getUsername());
        // if (user == null) {
        //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ShopAddResponse("User not found"));
        // }

        Shop shop = shopService.createShop(request, user);
        return ResponseEntity.ok(new ShopAddResponse(shop.getName(), shop.getLocation(), user.getUsername()));
        // try {
            // Shop shop = shopService.createShop(request, user);
            // return ResponseEntity.ok(new ShopAddResponse(shop.getName(), shop.getLocation(), user.getUsername()));
        // } catch (RuntimeException e) {
        //     return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ShopAddResponse(e.getMessage()));
        // }
    }
}
