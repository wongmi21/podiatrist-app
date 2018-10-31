package mi.wong.podiatrist.repository;

import mi.wong.podiatrist.model.Problem;
import mi.wong.podiatrist.model.ProblemName;
import mi.wong.podiatrist.model.Role;
import mi.wong.podiatrist.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {

    Optional<Problem> findByName(ProblemName problemName);
}