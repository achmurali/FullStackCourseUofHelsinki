import { v4 as uuid } from 'uuid';
import {Patient,PatientPartial,PatientEntry, Entry,NewEntry} from '../types'
//import { toNewPatient } from '../utils';
import patients from '../data/patients'

// const patients = [
//     {
//         "id": "d2773336-f723-11e9-8f0b-362b9e155667",
//         "name": "John McClane",
//         "dateOfBirth": "1986-07-09",
//         "ssn": "090786-122X",
//         "gender": "male",
//         "occupation": "New york city cop"
//     },
//     {
//         "id": "d2773598-f723-11e9-8f0b-362b9e155667",
//         "name": "Martin Riggs",
//         "dateOfBirth": "1979-01-30",
//         "ssn": "300179-77A",
//         "gender": "male",
//         "occupation": "Cop"
//     },
//     {
//         "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
//         "name": "Hans Gruber",
//         "dateOfBirth": "1970-04-25",
//         "ssn": "250470-555L",
//         "gender": "male",
//         "occupation": "Technician"
//     },
//     {
//         "id": "d2773822-f723-11e9-8f0b-362b9e155667",
//         "name": "Dana Scully",
//         "dateOfBirth": "1974-01-05",
//         "ssn": "050174-432N",
//         "gender": "female",
//         "occupation": "Forensic Pathologist"
//     },
//     {
//         "id": "d2773c6e-f723-11e9-8f0b-362b9e155667",
//         "name": "Matti Luukkainen",
//         "dateOfBirth": "1971-04-09",
//         "ssn": "090471-8890",
//         "gender": "male",
//         "occupation": "Digital evangelist"
//     }
// ]

let data: Array<Patient> = patients as Array<Patient>;

// const data :Patient[] = patients.map(patient => {
//     const obj = toNewPatient(patient) as Patient;
//     obj.id = patient.id;
//     return obj;
// })

const getPatients = ():Partial<Patient>[]  =>  {
    return data.map(({id,name,dateOfBirth,gender,occupation,entries}) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
            entries
        };
    })
}

const addPatient = (entry : PatientEntry) : PatientPartial => {
    const newPatient = {
        id:uuid(),
        ...entry,
        entries: [] as Entry[]
    };
    patients.push(newPatient);
    return {
        id:newPatient.id,
        name:newPatient.name,
        dateOfBirth:newPatient.dateOfBirth,
        gender:newPatient.gender,
        occupation:newPatient.occupation
    };
};

const getPatientById = (id:string) : Patient => {
    return patients.find(p => p.id === id) as Patient;
}

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
    const entry: Entry = { ...newEntry, id: uuid() };
    const savedPatient = { ...patient, entries: patient.entries.concat(entry) };
    data = data.map((p) =>
      p.id === savedPatient.id ? savedPatient : p
    );
  
    return savedPatient;
  };

export default {
    getPatients,
    addPatient,
    getPatientById,
    addEntry
}