package org.gimnasiofullstack.dto.session;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.gimnasiofullstack.dto.exercise.ExerciseEntry;

import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingSessionRequest {
    @NotNull(message = "La duración en segundos es obligatoria")
    @Positive(message = "La duración debe ser positiva")
    private Integer duracionSegundos;

    @NotNull(message = "La fecha y hora es obligatoria")
    @PastOrPresent(message = "La fecha y hora no puede ser futura")
    private Instant timestampCreacion;

    @NotNull(message = "La lista de ejercicios es obligatoria")
    private List<ExerciseEntry> ejercicios;
}
