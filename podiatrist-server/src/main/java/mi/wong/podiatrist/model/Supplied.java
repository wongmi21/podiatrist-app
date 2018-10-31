package mi.wong.podiatrist.model;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;

@Entity
@Table(name = "supplied")
public class Supplied {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    private SuppliedName name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SuppliedName getName() {
        return name;
    }

    public void setName(SuppliedName name) {
        this.name = name;
    }
}
