package com.example.jwt_rest.controllers;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;

@RestController
// @RequestMapping("")
public class HoneyPotController {
    /**
     * HoneyPotController is a controller that traps requests to common admin paths
     * and returns a forbidden response.
     * This is useful for detecting and preventing unauthorized access attempts.
     */

    private static final Logger log = LoggerFactory.getLogger(HoneyPotController.class);
    // Uncomment this method to log the client's IP address
    private String getClientIP() {
    // return ((ServletRequestAttributes)
    // RequestContextHolder.getRequestAttributes())
    // .getRequest().getRemoteAddr();

        ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attrs == null) {
            return "unknown";
        }
        return attrs.getRequest().getRemoteAddr();
    }

    @GetMapping("/admin")
    public ResponseEntity<String> trapAdminGet(HttpServletRequest request) {

        log.warn("HONEYPOT: Attempted access to /admin GET from IP {}", request.getRemoteAddr());
        
        String ip = getClientIP();
        String cmd = String.format(
                "firewall-cmd --permanent --add-rich-rule='rule family=\"ipv4\" source address=\"%s\" reject'", ip); //rejects the ip attempting to access the admin path
        try {
            Runtime.getRuntime().exec(new String[] { "bash", "-c", cmd });
            Runtime.getRuntime().exec(new String[] { "bash", "-c", "firewall-cmd --reload" });
        } catch (IOException e) {
            log.error("Failed to execute firewall command", e);
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @PostMapping("/admin")
    public ResponseEntity<String> trapAdminPost() {

        log.warn("HONEYPOT: Attempted access to /admin POST from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @GetMapping("/login")
    public ResponseEntity<String> trapLoginGet() {

        log.warn("HONEYPOT: Attempted access to /login GET from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> trapLoginPost() {

        log.warn("HONEYPOT: Attempted access to /login POST from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @GetMapping("/signin")
    public ResponseEntity<String> trapSigninGet() {

        log.warn("HONEYPOT: Attempted access to /signin GET from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @PostMapping("/signin")
    public ResponseEntity<String> trapSigninPost() {

        log.warn("HONEYPOT: Attempted access to /signin POST from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @GetMapping("/register")
    public ResponseEntity<String> trapRegisterGet() {

        log.warn("HONEYPOT: Attempted access to /register GET from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @PostMapping("/register")
    public ResponseEntity<String> trapRegisterPost() {

        log.warn("HONEYPOT: Attempted access to /register POST from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @GetMapping("/signup")
    public ResponseEntity<String> trapSignupGet() {

        log.warn("HONEYPOT: Attempted access to /signup GET from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @PostMapping("/signup")
    public ResponseEntity<String> trapSignupPost() {

        log.warn("HONEYPOT: Attempted access to /signup POST from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @GetMapping("/phpmyadmin")
    public ResponseEntity<String> trapPhpmyadminGet() {

        log.warn("HONEYPOT: Attempted access to /phpmyadmin GET from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @PostMapping("/phpmyadmin")
    public ResponseEntity<String> trapPhpmyadminPost() {

        log.warn("HONEYPOT: Attempted access to /phpmyadmin POST from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @GetMapping("/eval-stdin.php")
    public ResponseEntity<String> trapEvalstdinphpGet() {

        log.warn("HONEYPOT: Attempted access to /eval-stdin.php GET from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @PostMapping("/eval-stdin.php")
    public ResponseEntity<String> trapEvalstdinphpPost() {

        log.warn("HONEYPOT: Attempted access to /eval-stdin.php POST from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @GetMapping("/")
    public ResponseEntity<String> trapRootGet() {

        log.warn("HONEYPOT: Attempted access to / GET from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @PostMapping("/")
    public ResponseEntity<String> trapRootPost() {

        log.warn("HONEYPOT: Attempted access to / POST from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @GetMapping("/favicon.ico")
    public ResponseEntity<String> trapFaviconGet() {

        log.warn("HONEYPOT: Attempted access to /favicon.ico GET from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    @PostMapping("/favicon.ico")
    public ResponseEntity<String> trapFaviconPost() {

        log.warn("HONEYPOT: Attempted access to /favicon.ico POST from IP {}", getClientIP());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    }

    // @GetMapping("/error")
    // public ResponseEntity<String> trapErrorGet() {

    //     log.warn("HONEYPOT: Attempted access to /error GET from IP {}", getClientIP());

    //     return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    // }

    // @PostMapping("/error")
    // public ResponseEntity<String> trapErrorPost() {

    //     log.warn("HONEYPOT: Attempted access to /error POST from IP {}", getClientIP());

    //     return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Nope!");
    // }
}
