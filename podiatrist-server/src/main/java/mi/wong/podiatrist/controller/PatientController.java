package mi.wong.podiatrist.controller;

import mi.wong.podiatrist.model.*;
import mi.wong.podiatrist.payload.*;
import mi.wong.podiatrist.repository.OtherSignificantFindingRepository;
import mi.wong.podiatrist.repository.PatientRepository;
import mi.wong.podiatrist.repository.ProblemRepository;
import mi.wong.podiatrist.repository.SuppliedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private OtherSignificantFindingRepository otherSignificantFindingRepository;

    @Autowired
    private SuppliedRepository suppliedRepository;

    @GetMapping("/patient/all")
    public List<PatientSummary> getAllPatientData() {
        List<Patient> patients = patientRepository.findAll();
        List<PatientSummary> patientData = new ArrayList<>();
        for (Patient patient : patients) {
            patientData.add(new PatientSummary(patient));
        }
        return patientData;
    }

    @GetMapping("/patient/info")
    public PatientSummary getPatientInfo(@RequestParam(value = "nric") String nric) {
        Optional<Patient> patient = patientRepository.findByNric(nric);
        return patient.map(PatientSummary::new).orElse(null);
    }

    @PostMapping("/patient/add")
    public ResponseEntity<?> addPatient(@Valid @RequestBody AddPatientRequest addPatientRequest) {
        boolean alreadyExists = patientRepository.findByNric(addPatientRequest.getNric()).isPresent();
        if (alreadyExists) {
            return new ResponseEntity(new ApiResponse(false, "There already exists a patient with the same NRIC!"), HttpStatus.BAD_REQUEST);
        }
        patientRepository.save(new Patient(addPatientRequest.getName(), addPatientRequest.getNric(), addPatientRequest.getSex()));
        return ResponseEntity.ok(new ApiResponse(true, "Patient added!"));
    }

    @PostMapping("/patient/delete")
    public ResponseEntity<?> deletePatient(@Valid @RequestBody DeletePatientRequest deletePatientRequest) {
        Optional<Patient> optionalPatient = patientRepository.findByNric(deletePatientRequest.getNric());
        if (optionalPatient.isPresent()) {
            patientRepository.delete(optionalPatient.get());
            return ResponseEntity.ok(new ApiResponse(true, "Patient " + deletePatientRequest.getName() + "(" + deletePatientRequest.getNric() + ") deleted!"));
        } else {
            return new ResponseEntity(new ApiResponse(false, "Patient cannot be deleted"), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/patient/get")
    public Patient getPatientData(@RequestParam(value = "id") Long id) {
        return patientRepository.findById(id).get();
    }

    @PostMapping("/patient/edit")
    public ResponseEntity<?> editPatient(@Valid @RequestBody EditPatientRequest editPatientRequest) {
        Optional<Patient> optionalNricAlreadyExistsPatient = patientRepository.findByNric(editPatientRequest.getNric());
        boolean nricAlreadyExists = optionalNricAlreadyExistsPatient.isPresent();
        Patient patient;
        if (nricAlreadyExists) {
            Patient nricAlreadyExistsPatient = optionalNricAlreadyExistsPatient.get();
            if (!nricAlreadyExistsPatient.getId().equals(editPatientRequest.getId())) {
                return new ResponseEntity(new ApiResponse(false, "There already exists a patient with the same NRIC!"), HttpStatus.BAD_REQUEST);
            }
            patient = nricAlreadyExistsPatient;
        } else {
            patient = patientRepository.findById(editPatientRequest.getId()).get();
        }

        patient.setImageUrl(editPatientRequest.getImageUrl());

        patient.setPid(editPatientRequest.getPid());
        patient.setName(editPatientRequest.getName());
        patient.setNric(editPatientRequest.getNric());
        patient.setSex(editPatientRequest.getSex());
        patient.setDateOfBirth(editPatientRequest.getDateOfBirth());
        patient.setPhoneNumber(editPatientRequest.getPhoneNumber());
        patient.setEmail(editPatientRequest.getEmail());
        patient.setAddress(editPatientRequest.getAddress());
        patient.setPostalCode(editPatientRequest.getPostalCode());
        patient.setOccupation(editPatientRequest.getOccupation());
        patient.setHeight(editPatientRequest.getHeight());
        patient.setWeight(editPatientRequest.getWeight());
        patient.setShoeSize(editPatientRequest.getShoeSize());
        List<Problem> problems = new ArrayList<>();
        for (String problemName : editPatientRequest.getProblems()) {
            problems.add(problemRepository.findByName(ProblemName.valueOf(problemName)).get());
        }
        patient.setProblems(problems);
        patient.setAdditionalProblems(editPatientRequest.getAdditionalProblems());
        List<OtherSignificantFinding> otherSignificantFindings = new ArrayList<>();
        for (String otherSignificantFinding : editPatientRequest.getOtherSignificantFindings()) {
            otherSignificantFindings.add(otherSignificantFindingRepository.findByName(OtherSignificantFindingName.valueOf(otherSignificantFinding)).get());
        }
        patient.setOtherSignificantFindings(otherSignificantFindings);
        patient.setAdditionalOtherSignificantFindings(editPatientRequest.getAdditionalOtherSignificantFindings());
        List<Supplied> supplied = new ArrayList<>();
        for (String suppliedOne : editPatientRequest.getSupplied()) {
            supplied.add(suppliedRepository.findByName(SuppliedName.valueOf(suppliedOne)).get());
        }
        patient.setSupplied(supplied);
        patient.setAdditionalSupplied(editPatientRequest.getAdditionalSupplied());
        patient.setSymptomsData(editPatientRequest.getSymptomsData());
        patient.setTestResultsData(editPatientRequest.getTestResultsData());
        patient.setAdditionalNotes(editPatientRequest.getAdditionalNotes());
        patientRepository.save(patient);
        return ResponseEntity.ok(new ApiResponse(true, "Patient " + editPatientRequest.getName()+ " updated!"));
    }
}