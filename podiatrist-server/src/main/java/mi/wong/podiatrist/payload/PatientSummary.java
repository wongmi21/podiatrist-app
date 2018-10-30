package mi.wong.podiatrist.payload;

import mi.wong.podiatrist.model.Patient;

public class PatientSummary {

    private Long id;
    private String name;
    private String nric;
    private String sex;
    private Integer dateOfBirth;

    public PatientSummary(Patient patient) {
        this.id = patient.getId();
        this.name = patient.getName();
        this.nric = patient.getNric();
        this.sex = patient.getSex();
        this.dateOfBirth = patient.getDateOfBirth();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKey() {
        return Long.toString(id);
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

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Integer getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Integer dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
}