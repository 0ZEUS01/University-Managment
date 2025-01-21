package com.microservices.userservice.service;

import com.microservices.userservice.dto.AuthRequest;
import com.microservices.userservice.dto.AuthResponse;
import com.microservices.userservice.model.User;
import com.microservices.userservice.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.Date;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    private static final String JWT_SECRET = "YourSecretKeyHerePleaseMakeItLongAndComplex";
    private static final long JWT_EXPIRATION = 86400000; // 24 hours

    @PostConstruct
    public void initializeDefaultUsers() {
        // Check and create predefined users if they don't exist
        createUserIfNotExists("AmalHida", "AmalHida", "amal.hida@example.com", User.UserRole.STUDENT);
        createUserIfNotExists("YahyaZini", "YahyaZini", "yahya.zini@example.com", User.UserRole.TEACHER);
    }

    private void createUserIfNotExists(String username, String password, String email, User.UserRole role) {
        if (!userRepository.existsByUsername(username)) {
            User user = new User();
            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password));
            user.setRole(role);
            userRepository.save(user);
        }
    }

    public AuthResponse signUp(AuthRequest signUpRequest) {
        // Check if username or email already exists
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Email is already in use!");
        }

        // Create new user
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        
        // Set role, defaulting to STUDENT if not specified
        try {
            user.setRole(User.UserRole.valueOf(signUpRequest.getRole().toUpperCase()));
        } catch (Exception e) {
            user.setRole(User.UserRole.STUDENT);
        }

        userRepository.save(user);

        // Generate JWT token
        String token = generateJwtToken(user.getUsername());

        return new AuthResponse(
            token, 
            user.getUsername(), 
            user.getRole().name(), 
            user.getId()
        );
    }

    public AuthResponse signIn(AuthRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(), 
                loginRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // Find user
        User user = userRepository.findByUsername(loginRequest.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Update last login
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        // Generate JWT token
        String token = generateJwtToken(user.getUsername());

        return new AuthResponse(
            token, 
            user.getUsername(), 
            user.getRole().name(), 
            user.getId()
        );
    }

    private String generateJwtToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(new Date().getTime() + JWT_EXPIRATION))
            .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
            .compact();
    }
}
