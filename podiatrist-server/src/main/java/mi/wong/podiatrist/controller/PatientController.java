package mi.wong.podiatrist.controller;

import mi.wong.podiatrist.model.Patient;
import mi.wong.podiatrist.payload.AddPatientRequest;
import mi.wong.podiatrist.payload.ApiResponse;
import mi.wong.podiatrist.payload.DeletePatientRequest;
import mi.wong.podiatrist.payload.PatientSummary;
import mi.wong.podiatrist.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

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
}