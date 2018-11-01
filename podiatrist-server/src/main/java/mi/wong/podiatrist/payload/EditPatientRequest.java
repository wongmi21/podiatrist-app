package mi.wong.podiatrist.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

public class EditPatientRequest {

    @NotNull
    private Long id;
    private Long pid;
    private String imageUrl;
    private String name;
    @NotBlank
    private String nric;
    private String sex;
    private Integer dateOfBirth;
    private String phoneNumber;
    private String email;
    private String address;
    private String postalCode;
    private String occupation;
    private Integer height;
    private Integer weight;
    private Double shoeSize;
    private List<String> problems = new ArrayList<>();
    private String additionalProblems;
    private List<String> otherSignificantFindings = new ArrayList<>();
    private String additionalOtherSignificantFindings;
    private List<String> supplied = new ArrayList<>();
    private String additionalSupplied;
    private String symptomsData;
    private String testResultsData;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Double getShoeSize() {
        return shoeSize;
    }

    public void setShoeSize(Double shoeSize) {
        this.shoeSize = shoeSize;
    }

    public List<String> getProblems() {
        return problems;
    }

    public void setProblems(List<String> problems) {
        this.problems = problems;
    }

    public String getAdditionalProblems() {
        return additionalProblems;
    }

    public void setAdditionalProblems(String additionalProblems) {
        this.additionalProblems = additionalProblems;
    }

    public List<String> getOtherSignificantFindings() {
        return otherSignificantFindings;
    }

    public void setOtherSignificantFindings(List<String> otherSignificantFindings) {
        this.otherSignificantFindings = otherSignificantFindings;
    }

    public String getAdditionalOtherSignificantFindings() {
        return additionalOtherSignificantFindings;
    }

    public void setAdditionalOtherSignificantFindings(String additionalOtherSignificantFindings) {
        this.additionalOtherSignificantFindings = additionalOtherSignificantFindings;
    }

    public List<String> getSupplied() {
        return supplied;
    }

    public void setSupplied(List<String> supplied) {
        this.supplied = supplied;
    }

    public String getAdditionalSupplied() {
        return additionalSupplied;
    }

    public void setAdditionalSupplied(String additionalSupplied) {
        this.additionalSupplied = additionalSupplied;
    }

    public String getSymptomsData() {
        return symptomsData;
    }

    public void setSymptomsData(String symptomsData) {
        this.symptomsData = symptomsData;
    }

    public String getTestResultsData() {
        return testResultsData;
    }

    public void setTestResultsData(String testResultsData) {
        this.testResultsData = testResultsData;
    }
}