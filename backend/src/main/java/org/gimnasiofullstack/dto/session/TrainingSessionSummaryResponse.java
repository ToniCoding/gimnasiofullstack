package org.gimnasiofullstack.dto.session;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingSessionSummaryResponse {
    private Long id;
    private Instant timestampCreacion;
    private Integer duracionSegundos;
    private Integer totalEjercicios;
    private Integer totalSeries;
}