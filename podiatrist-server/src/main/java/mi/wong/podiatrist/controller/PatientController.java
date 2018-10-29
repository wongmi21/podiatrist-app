package mi.wong.podiatrist.controller;

import mi.wong.podiatrist.model.Patient;
import mi.wong.podiatrist.payload.PatientInfo;
import mi.wong.podiatrist.payload.UserIdentityAvailability;
import mi.wong.podiatrist.payload.UserSummary;
import mi.wong.podiatrist.repository.PatientRepository;
import mi.wong.podiatrist.repository.UserRepository;
import mi.wong.podiatrist.security.CurrentUser;
import mi.wong.podiatrist.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping("/patient/all")
    public List<PatientInfo> getAllPatientData() {
        List<Patient> patients = patientRepository.findAll();
        List<PatientInfo> patientData = new ArrayList<>();
        for (Patient patient : patients) {
            patientData.add(new PatientInfo(patient));
        }
        return patientData;
    }

    @GetMapping("/patient/info")
    public PatientInfo getPatientInfo(@RequestParam(value = "nric") String nric) {
        Optional<Patient> patient = patientRepository.findByNric(nric);
        return patient.map(PatientInfo::new).orElse(null);
    }
}