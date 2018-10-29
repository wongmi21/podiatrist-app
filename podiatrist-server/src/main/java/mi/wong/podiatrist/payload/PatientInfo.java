package mi.wong.podiatrist.payload;

import mi.wong.podiatrist.model.Patient;

public class PatientInfo {

    private Long id;
    private String name;
    private String nric;
    private String phoneNumber;

    public PatientInfo(Patient patient) {
        this.id = patient.getId();
        this.name = patient.getName();
        this.nric = patient.getNric();
        this.phoneNumber = patient.getPhoneNumber();
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}