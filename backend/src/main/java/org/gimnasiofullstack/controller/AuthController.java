package org.gimnasiofullstack.controller;

import org.gimnasiofullstack.dto.user.UserLoginRequest;
import org.gimnasiofullstack.dto.user.UserLoginResponse;
import org.gimnasiofullstack.dto.user.UserRegisterRequest;
import org.gimnasiofullstack.dto.user.UserRegisterResponse;
import org.gimnasiofullstack.service.AuthService;
import org.gimnasiofullstack.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserRegisterResponse> register(@Valid @RequestBody UserRegisterRequest request) {
        UserRegisterResponse response = userService.registerUser(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@Valid @RequestBody UserLoginRequest request) {
        UserLoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
