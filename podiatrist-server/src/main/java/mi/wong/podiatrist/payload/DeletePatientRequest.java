package mi.wong.podiatrist.payload;

import javax.validation.constraints.NotBlank;

public class DeletePatientRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String nric;

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