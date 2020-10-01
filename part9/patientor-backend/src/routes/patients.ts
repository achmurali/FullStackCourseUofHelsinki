import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient,toNewEntry } from '../utils';

const router = express.Router();

router.get("/",(_req,res) => {
    res.json(patientService.getPatients());
});

router.post("/",(req,res) => {
    let newPatient = patientService.addPatient(toNewPatient(req.body));
    return res.json(newPatient);
})

router.get("/:id",(req,res) => {
    let newPatient = patientService.getPatientById(req.params.id);
    return res.json(newPatient);
})

router.post("/:id/entries", (req, res) => {
    const patient = patientService.getPatientById(req.params.id);
  
    if (patient) {
      try {
        const newEntry = toNewEntry(req.body);
        const updatedPatient = patientService.addEntry(patient, newEntry);
        res.json(updatedPatient);
      } catch (e) {
        res.status(400).send({ error: e.message });
      }
    } else {
      res.status(404).send({ error: "Sorry, this patient does not exist" });
    }
  });

export default router;