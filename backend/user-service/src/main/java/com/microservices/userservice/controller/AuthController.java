package com.microservices.userservice.controller;

import com.microservices.userservice.dto.AuthRequest;
import com.microservices.userservice.dto.AuthResponse;
import com.microservices.userservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> registerUser(
        @Valid @RequestBody AuthRequest signUpRequest
    ) {
        AuthResponse response = authService.signUp(signUpRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> authenticateUser(
        @Valid @RequestBody AuthRequest loginRequest
    ) {
        AuthResponse response = authService.signIn(loginRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/validate")
    public ResponseEntity<Boolean> validateToken(
        @RequestParam("token") String token
    ) {
        // Implement token validation logic
        // This is a placeholder - you'll need to implement actual token validation
        return ResponseEntity.ok(true);
    }
}
