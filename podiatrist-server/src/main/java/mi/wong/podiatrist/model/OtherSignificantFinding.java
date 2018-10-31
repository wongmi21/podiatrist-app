package mi.wong.podiatrist.model;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;

@Entity
@Table(name = "other_significant_findings")
public class OtherSignificantFinding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    private OtherSignificantFindingName name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OtherSignificantFindingName getName() {
        return name;
    }

    public void setName(OtherSignificantFindingName name) {
        this.name = name;
    }
}
