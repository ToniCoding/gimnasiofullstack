package org.gimnasiofullstack.dto.session;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.gimnasiofullstack.dto.exercise.ExerciseResponse;

import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingSessionResponse {
    private Long id;
    private Integer duracionSegundos;
    private Instant timestampCreacion;
    private List<ExerciseResponse> ejercicios;
}
