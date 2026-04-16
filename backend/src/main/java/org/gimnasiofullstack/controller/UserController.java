package org.gimnasiofullstack.controller;

import org.gimnasiofullstack.dto.user.UserModificationRequest;
import org.gimnasiofullstack.dto.user.UserModificationResponse;
import org.gimnasiofullstack.service.UserService;
import org.gimnasiofullstack.utils.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final SecurityUtils securityUtils;

    @GetMapping("/profile")
    public ResponseEntity<UserModificationResponse> getProfile() {
        Long userId = securityUtils.getCurrentUserId();
        UserModificationResponse response = userService.getUserProfile(userId);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/profile")
    public ResponseEntity<UserModificationResponse> updateProfile(@Valid @RequestBody UserModificationRequest request) {
        Long userId = securityUtils.getCurrentUserId();
        UserModificationResponse response = userService.updateUser(userId, request);
        return ResponseEntity.ok(response);
    }
}
