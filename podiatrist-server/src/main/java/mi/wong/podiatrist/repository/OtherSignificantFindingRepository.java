package mi.wong.podiatrist.repository;

import mi.wong.podiatrist.model.OtherSignificantFinding;
import mi.wong.podiatrist.model.OtherSignificantFindingName;
import mi.wong.podiatrist.model.Problem;
import mi.wong.podiatrist.model.ProblemName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtherSignificantFindingRepository extends JpaRepository<OtherSignificantFinding, Long> {

    Optional<OtherSignificantFinding> findByName(OtherSignificantFindingName otherSignificantFindingName);
}