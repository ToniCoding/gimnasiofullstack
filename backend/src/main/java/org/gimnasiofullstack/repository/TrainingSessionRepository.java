package org.gimnasiofullstack.repository;

import org.gimnasiofullstack.model.TrainingSession;
import org.gimnasiofullstack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.Instant;
import java.util.List;

@Repository
public interface TrainingSessionRepository extends JpaRepository<TrainingSession, Long> {
    List<TrainingSession> findByUsuario(User usuario);
    List<TrainingSession> findByUsuarioOrderByTimestampCreacionDesc(User usuario);
    List<TrainingSession> findByTimestampCreacionBetween(Instant start, Instant end);
}