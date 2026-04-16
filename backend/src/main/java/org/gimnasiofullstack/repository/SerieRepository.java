package org.gimnasiofullstack.repository;

import org.gimnasiofullstack.model.Serie;
import org.gimnasiofullstack.model.TrainingSessionExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SerieRepository extends JpaRepository<Serie, Long> {
    List<Serie> findByTrainingSessionExercise(TrainingSessionExercise trainingSessionExercise);
    List<Serie> findByTrainingSessionExerciseOrderByOrdenAsc(TrainingSessionExercise trainingSessionExercise);
}