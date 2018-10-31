package mi.wong.podiatrist.repository;

import mi.wong.podiatrist.model.Supplied;
import mi.wong.podiatrist.model.SuppliedName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SuppliedRepository extends JpaRepository<Supplied, Long> {

    Optional<Supplied> findByName(SuppliedName suppliedName);
}