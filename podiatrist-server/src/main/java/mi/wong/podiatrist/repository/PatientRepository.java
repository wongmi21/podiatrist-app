package mi.wong.podiatrist.repository;

import mi.wong.podiatrist.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    Optional<Patient> findByNric(String nric);

    Boolean existsByNric(String nric);
}