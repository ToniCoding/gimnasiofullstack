package org.gimnasiofullstack.service;

import org.gimnasiofullstack.dto.exercise.ExerciseEntry;
import org.gimnasiofullstack.dto.exercise.ExerciseResponse;
import org.gimnasiofullstack.dto.serie.SerieEntry;
import org.gimnasiofullstack.dto.serie.SerieResponse;
import org.gimnasiofullstack.dto.session.TrainingSessionRequest;
import org.gimnasiofullstack.dto.session.TrainingSessionResponse;
import org.gimnasiofullstack.dto.session.TrainingSessionSummaryResponse;
import org.gimnasiofullstack.model.*;
import org.gimnasiofullstack.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrainingSessionService {

    private final TrainingSessionRepository trainingSessionRepository;
    private final TrainingSessionExerciseRepository trainingSessionExerciseRepository;
    private final SerieRepository serieRepository;
    private final ExerciseRepository exerciseRepository;
    private final UserService userService;

    @Transactional
    public TrainingSessionResponse createTrainingSession(Long userId, TrainingSessionRequest request) {
        User user = userService.getUserById(userId);

        TrainingSession session = new TrainingSession();
        session.setUsuario(user);
        session.setDuracionSegundos(request.getDuracionSegundos());
        session.setTimestampCreacion(request.getTimestampCreacion());

        TrainingSession savedSession = trainingSessionRepository.save(session);

        int ejercicioOrden = 0;

        for (ExerciseEntry exerciseEntry : request.getEjercicios()) {
            ejercicioOrden++;

            Exercise exercise = exerciseRepository.findByNombre(exerciseEntry.getNombreEjercicio())
                    .orElseGet(() -> {
                        Exercise newExercise = new Exercise();
                        newExercise.setNombre(exerciseEntry.getNombreEjercicio());
                        newExercise.setDescripcion(exerciseEntry.getDescripcion() != null ? exerciseEntry.getDescripcion() : "");
                        return exerciseRepository.save(newExercise);
                    });

            TrainingSessionExercise sessionExercise = new TrainingSessionExercise();
            sessionExercise.setTrainingSession(savedSession);
            sessionExercise.setExercise(exercise);
            sessionExercise.setOrden(ejercicioOrden);

            TrainingSessionExercise savedSessionExercise = trainingSessionExerciseRepository.save(sessionExercise);

            int serieOrden = 0;
            for (SerieEntry serieEntry : exerciseEntry.getSeries()) {
                serieOrden++;
                Serie serie = new Serie();
                serie.setKg(serieEntry.getKg());
                serie.setRepeticiones(serieEntry.getRepeticiones());
                serie.setOrden(serieOrden);
                serie.setTrainingSessionExercise(savedSessionExercise);
                serieRepository.save(serie);
            }
        }

        return mapToResponse(savedSession);
    }

    @Transactional(readOnly = true)
    public List<TrainingSessionSummaryResponse> getUserSessionsSummary(Long userId) {
        User user = userService.getUserById(userId);
        List<TrainingSession> sessions = trainingSessionRepository.findByUsuarioOrderByTimestampCreacionDesc(user);

        return sessions.stream().map(session -> {
            List<TrainingSessionExercise> ejercicios = trainingSessionExerciseRepository.findByTrainingSession(session);
            int totalEjercicios = ejercicios.size();
            int totalSeries = ejercicios.stream()
                    .mapToInt(e -> serieRepository.findByTrainingSessionExercise(e).size())
                    .sum();

            TrainingSessionSummaryResponse response = new TrainingSessionSummaryResponse();
            response.setId(session.getId());
            response.setTimestampCreacion(session.getTimestampCreacion());
            response.setDuracionSegundos(session.getDuracionSegundos());
            response.setTotalEjercicios(totalEjercicios);
            response.setTotalSeries(totalSeries);
            return response;
        }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TrainingSessionResponse getTrainingSessionById(Long sessionId) {
        TrainingSession session = trainingSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Sesión no encontrada con id: " + sessionId));
        return mapToResponse(session);
    }

    @Transactional(readOnly = true)
    public List<TrainingSessionResponse> getAllUserTrainingSessions(Long userId) {
        User user = userService.getUserById(userId);
        List<TrainingSession> sessions = trainingSessionRepository.findByUsuarioOrderByTimestampCreacionDesc(user);
        return sessions.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private TrainingSessionResponse mapToResponse(TrainingSession session) {
        TrainingSessionResponse response = new TrainingSessionResponse();
        response.setId(session.getId());
        response.setDuracionSegundos(session.getDuracionSegundos());
        response.setTimestampCreacion(session.getTimestampCreacion());
        response.setUserId(session.getUsuario().getId());

        List<TrainingSessionExercise> ejercicios = trainingSessionExerciseRepository
                .findByTrainingSessionOrderByOrdenAsc(session);

        List<ExerciseResponse> exerciseResponses = new ArrayList<>();

        for (TrainingSessionExercise te : ejercicios) {
            ExerciseResponse exerciseResponse = new ExerciseResponse();
            exerciseResponse.setId(te.getExercise().getId());
            exerciseResponse.setNombre(te.getExercise().getNombre());
            exerciseResponse.setDescripcion(te.getExercise().getDescripcion());
            exerciseResponse.setOrden(te.getOrden());

            List<Serie> series = serieRepository.findByTrainingSessionExerciseOrderByOrdenAsc(te);
            List<SerieResponse> serieResponses = new ArrayList<>();

            for (Serie s : series) {
                SerieResponse serieResponse = new SerieResponse();
                serieResponse.setId(s.getId());
                serieResponse.setKg(s.getKg());
                serieResponse.setRepeticiones(s.getRepeticiones());
                serieResponse.setOrden(s.getOrden());
                serieResponses.add(serieResponse);
            }

            exerciseResponse.setSeries(serieResponses);
            exerciseResponses.add(exerciseResponse);
        }

        response.setEjercicios(exerciseResponses);
        return response;
    }
}