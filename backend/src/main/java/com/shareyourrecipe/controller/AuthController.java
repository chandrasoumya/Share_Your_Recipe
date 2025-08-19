package com.shareyourrecipe.controller;

import com.shareyourrecipe.dto.AuthDtos;
import com.shareyourrecipe.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthDtos.JwtResponse> signup(@Valid @RequestBody AuthDtos.SignupRequest request) {
        return ResponseEntity.ok(authService.signup(request));
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthDtos.JwtResponse> signin(@Valid @RequestBody AuthDtos.SigninRequest request) {
        return ResponseEntity.ok(authService.signin(request));
    }
}


