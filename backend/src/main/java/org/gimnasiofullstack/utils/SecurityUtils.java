package org.gimnasiofullstack.utils;

import org.gimnasiofullstack.model.User;
import org.gimnasiofullstack.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityUtils {

    private final UserService userService;

    public User getCurrentUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = userDetails.getUsername();
        return userService.getUserByEmail(email);
    }

    public Long getCurrentUserId() {
        return getCurrentUser().getId();
    }
}
