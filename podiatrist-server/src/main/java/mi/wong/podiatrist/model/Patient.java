package mi.wong.podiatrist.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long pid;

    // Patient Image
    @Lob
    private String imageUrl;

    // Patient Details
    private String name;
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

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "patient_problems",
            joinColumns = @JoinColumn(name = "patient_id"),
            inverseJoinColumns = @JoinColumn(name = "problem_id"))
    private List<Problem> problems = new ArrayList<>();

    private String additionalProblems;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "patient_other_significant_findings",
            joinColumns = @JoinColumn(name = "patient_id"),
            inverseJoinColumns = @JoinColumn(name = "other_significant_finding_id"))
    private List<OtherSignificantFinding> otherSignificantFindings = new ArrayList<>();

    private String additionalOtherSignificantFindings;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "patient_supplied",
            joinColumns = @JoinColumn(name = "patient_id"),
            inverseJoinColumns = @JoinColumn(name = "supplied_id"))
    private List<Supplied> supplied = new ArrayList<>();

    private String additionalSupplied;

    @Lob
    private String symptomsData;

    public Patient() {
    }

    public Patient(String name, String nric, String sex) {
        this.name = name;
        this.nric = nric;
        this.sex = sex;
    }

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

    public List<Problem> getProblems() {
        return problems;
    }

    public void setProblems(List<Problem> problems) {
        this.problems = problems;
    }

    public String getAdditionalProblems() {
        return additionalProblems;
    }

    public void setAdditionalProblems(String additionalProblems) {
        this.additionalProblems = additionalProblems;
    }

    public List<OtherSignificantFinding> getOtherSignificantFindings() {
        return otherSignificantFindings;
    }

    public void setOtherSignificantFindings(List<OtherSignificantFinding> otherSignificantFindings) {
        this.otherSignificantFindings = otherSignificantFindings;
    }

    public String getAdditionalOtherSignificantFindings() {
        return additionalOtherSignificantFindings;
    }

    public void setAdditionalOtherSignificantFindings(String additionalOtherSignificantFindings) {
        this.additionalOtherSignificantFindings = additionalOtherSignificantFindings;
    }

    public List<Supplied> getSupplied() {
        return supplied;
    }

    public void setSupplied(List<Supplied> supplied) {
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
}
