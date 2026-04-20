package org.gimnasiofullstack.controller;

import org.gimnasiofullstack.dto.session.TrainingSessionRequest;
import org.gimnasiofullstack.dto.session.TrainingSessionResponse;
import org.gimnasiofullstack.dto.session.TrainingSessionSummaryResponse;
import org.gimnasiofullstack.service.TrainingSessionService;
import org.gimnasiofullstack.utils.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/training-sessions")
@RequiredArgsConstructor
public class TrainingSessionController {

    private final TrainingSessionService trainingSessionService;
    private final SecurityUtils securityUtils;

    @PostMapping
    public ResponseEntity<TrainingSessionResponse> createTrainingSession(@Valid @RequestBody TrainingSessionRequest request) {
        Long userId = securityUtils.getCurrentUserId();
        TrainingSessionResponse response = trainingSessionService.createTrainingSession(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<TrainingSessionSummaryResponse>> getUserSessionsSummary() {
        Long userId = securityUtils.getCurrentUserId();
        List<TrainingSessionSummaryResponse> sessions = trainingSessionService.getUserSessionsSummary(userId);
        return ResponseEntity.ok(sessions);
    }

    @GetMapping("/all")
    public ResponseEntity<List<TrainingSessionResponse>> getAllUserTrainingSessions() {
        Long userId = securityUtils.getCurrentUserId();
        List<TrainingSessionResponse> sessions = trainingSessionService.getAllUserTrainingSessions(userId);
        return ResponseEntity.ok(sessions);
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<TrainingSessionResponse> getTrainingSessionById(@PathVariable Long sessionId) {
        Long userId = securityUtils.getCurrentUserId();
        TrainingSessionResponse session = trainingSessionService.getTrainingSessionById(sessionId);

        if (!session.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(session);
    }
}