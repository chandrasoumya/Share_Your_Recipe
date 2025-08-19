package com.shareyourrecipe.service;

import com.shareyourrecipe.dto.AuthDtos;
import com.shareyourrecipe.model.User;
import com.shareyourrecipe.repository.UserRepository;
import com.shareyourrecipe.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthDtos.JwtResponse signup(AuthDtos.SignupRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        userRepository.save(user);

        String token = jwtService.generateToken(new org.springframework.security.core.userdetails.User(
                user.getUsername(), user.getPassword(), java.util.List.of()
        ));
        return new AuthDtos.JwtResponse(token, user.getUsername(), user.getEmail());
    }

    public AuthDtos.JwtResponse signin(AuthDtos.SigninRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
        User user = userRepository.findByUsername(principal.getUsername()).orElseThrow();
        String token = jwtService.generateToken(principal);
        return new AuthDtos.JwtResponse(token, user.getUsername(), user.getEmail());
    }
}


