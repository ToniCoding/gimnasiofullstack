package org.gimnasiofullstack.service;

import org.gimnasiofullstack.dto.exercise.ExerciseResponse;
import org.gimnasiofullstack.model.Exercise;
import org.gimnasiofullstack.repository.ExerciseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;

    @Transactional(readOnly = true)
    public List<ExerciseResponse> getAllExercises() {
        return exerciseRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ExerciseResponse getExerciseById(Long id) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ejercicio no encontrado con id: " + id));
        return mapToResponse(exercise);
    }

    @Transactional(readOnly = true)
    public ExerciseResponse getExerciseByNombre(String nombre) {
        Exercise exercise = exerciseRepository.findByNombre(nombre)
                .orElseThrow(() -> new RuntimeException("Ejercicio no encontrado con nombre: " + nombre));
        return mapToResponse(exercise);
    }

    @Transactional(readOnly = true)
    public List<ExerciseResponse> searchExercisesByNombre(String nombre) {
        List<ExerciseResponse> results = exerciseRepository.findAll().stream()
                .filter(e -> e.getNombre().toLowerCase().contains(nombre.toLowerCase()))
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        if (results.isEmpty()) {
            throw new RuntimeException("No se encontraron ejercicios con nombre: " + nombre);
        }

        return results;
    }

    private ExerciseResponse mapToResponse(Exercise exercise) {
        ExerciseResponse response = new ExerciseResponse();
        response.setId(exercise.getId());
        response.setNombre(exercise.getNombre());
        response.setDescripcion(exercise.getDescripcion());
        return response;
    }
}