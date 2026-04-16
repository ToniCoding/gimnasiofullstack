package org.gimnasiofullstack.repository;

import org.gimnasiofullstack.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    Optional<Exercise> findByNombre(String nombre);
    boolean existsByNombre(String nombre);
}