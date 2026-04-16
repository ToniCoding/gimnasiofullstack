package org.gimnasiofullstack.repository;

import org.gimnasiofullstack.model.TrainingSession;
import org.gimnasiofullstack.model.TrainingSessionExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TrainingSessionExerciseRepository extends JpaRepository<TrainingSessionExercise, Long> {
    List<TrainingSessionExercise> findByTrainingSession(TrainingSession trainingSession);
    List<TrainingSessionExercise> findByTrainingSessionOrderByOrdenAsc(TrainingSession trainingSession);
}