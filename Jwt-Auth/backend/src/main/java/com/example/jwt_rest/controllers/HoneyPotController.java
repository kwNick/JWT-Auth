package com.example.jwt_rest.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// @RequestMapping("")
public class HoneyPotController {
    /**
     * HoneyPotController is a controller that traps requests to common admin paths
     * and returns a forbidden response.
     * This is useful for detecting and preventing unauthorized access attempts.
     */


    // private static final Logger log = LoggerFactory.getLogger(HoneyPotController.class);
    // Uncomment this method to log the client's IP address
    // private String getClientIP() {
    //     return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
    //             .getRequest().getRemoteAddr();
    // }
    
    @GetMapping("/admin")
    public ResponseEntity<String> trapAdminGet() {

        // log.warn("HONEYPOT: Attempted access to /admin from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @PostMapping("/admin")
    public ResponseEntity<String> trapAdminPost() {

        // log.warn("HONEYPOT: Attempted access to /admin from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @GetMapping("/login")
    public ResponseEntity<String> trapLoginGet() {

        // log.warn("HONEYPOT: Attempted access to /admin from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> trapLoginPost() {

        // log.warn("HONEYPOT: Attempted access to /admin from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @GetMapping("/signin")
    public ResponseEntity<String> trapSigninGet() {

        // log.warn("HONEYPOT: Attempted access to /admin from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @PostMapping("/signin")
    public ResponseEntity<String> trapSigninPost() {

        // log.warn("HONEYPOT: Attempted access to /admin from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @GetMapping("/register")
    public ResponseEntity<String> trapRegisterGet() {

        // log.warn("HONEYPOT: Attempted access to /admin from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @PostMapping("/register")
    public ResponseEntity<String> trapRegisterPost() {

        // log.warn("HONEYPOT: Attempted access to /admin from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @GetMapping("/signup")
    public ResponseEntity<String> trapSignupGet() {

        // log.warn("HONEYPOT: Attempted access to /admin from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @PostMapping("/signup")
    public ResponseEntity<String> trapSignupPost() {

        // log.warn("HONEYPOT: Attempted access to /admin from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @GetMapping("/phpmyadmin")
    public ResponseEntity<String> trapPhpmyadminGet() {

        // log.warn("HONEYPOT: Attempted access to /admin from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @PostMapping("/phpmyadmin")
    public ResponseEntity<String> trapPhpmyadminPost() {

        // log.warn("HONEYPOT: Attempted access to /admin from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @GetMapping("/eval-stdin.php")
    public ResponseEntity<String> trapEvalstdinphpGet() {

        // log.warn("HONEYPOT: Attempted access to /admin from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @PostMapping("/eval-stdin.php")
    public ResponseEntity<String> trapEvalstdinphpPost() {

        // log.warn("HONEYPOT: Attempted access to /admin from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }
    
}
