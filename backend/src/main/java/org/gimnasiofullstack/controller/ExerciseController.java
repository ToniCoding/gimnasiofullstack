package org.gimnasiofullstack.controller;

import org.gimnasiofullstack.dto.exercise.ExerciseResponse;
import org.gimnasiofullstack.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/exercises")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;

    @GetMapping
    public ResponseEntity<List<ExerciseResponse>> getAllExercises() {
        return ResponseEntity.ok(exerciseService.getAllExercises());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExerciseResponse> getExerciseById(@PathVariable Long id) {
        ExerciseResponse response = exerciseService.getExerciseById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ExerciseResponse>> searchExercises(@RequestParam String nombre) {
        List<ExerciseResponse> responses = exerciseService.searchExercisesByNombre(nombre);
        return ResponseEntity.ok(responses);
    }
}