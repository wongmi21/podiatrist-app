package mi.wong.podiatrist.payload;

import mi.wong.podiatrist.model.Patient;

public class PatientInfo {

    private Long id;
    private String name;
    private String nric;

    public PatientInfo(Patient patient) {
        this.id = patient.getId();
        this.name = patient.getName();
        this.nric = patient.getNric();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNric() {
        return nric;
    }

    public void setNric(String nric) {
        this.nric = nric;
    }
}