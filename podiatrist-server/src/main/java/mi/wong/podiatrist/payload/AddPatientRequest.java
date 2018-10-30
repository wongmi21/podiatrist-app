package mi.wong.podiatrist.payload;

import javax.validation.constraints.NotBlank;

public class AddPatientRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String nric;

    @NotBlank
    private String sex;

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
}