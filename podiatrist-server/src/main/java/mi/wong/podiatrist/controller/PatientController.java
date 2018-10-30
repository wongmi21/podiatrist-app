package mi.wong.podiatrist.controller;

import mi.wong.podiatrist.model.Patient;
import mi.wong.podiatrist.payload.AddPatientRequest;
import mi.wong.podiatrist.payload.ApiResponse;
import mi.wong.podiatrist.payload.PatientSummary;
import mi.wong.podiatrist.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
        patientRepository.save(new Patient(addPatientRequest.getName(), addPatientRequest.getNric(), addPatientRequest.getSex()));
        return ResponseEntity.ok(new ApiResponse(true, "Patient added!"));
    }
}