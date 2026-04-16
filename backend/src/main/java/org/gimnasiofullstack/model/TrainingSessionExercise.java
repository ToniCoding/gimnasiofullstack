package org.gimnasiofullstack.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "training_session_exercises")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingSessionExercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer orden;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "training_session_id", nullable = false)
    @ToString.Exclude
    private TrainingSession trainingSession;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id", nullable = false)
    @ToString.Exclude
    private Exercise exercise;

    @OneToMany(mappedBy = "trainingSessionExercise", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<Serie> series = new ArrayList<>();
}
