import React, { useEffect,useRef } from 'react';
import { useParams } from 'react-router';
import { useStateValue, updatePatient } from "../state";
import { Container,Icon,Card,Button } from 'semantic-ui-react';
import { Patient,NewEntry,EntryType } from '../types';
import axios from 'axios';
import EntryDetails from './EntryDetails';
import { apiBaseUrl } from "../constants";
import AddEntryModal from "../AddEntryModal";


const gender = {
    male: { name: "mars" as "mars", color: "blue" as "blue" },
    female: { name: "venus" as "venus", color: "pink" as "pink" },
    other: { name: "genderless" as "genderless", color: "grey" as "grey" }
}

const PatientPage : React.FC = () => {
    const { id } = useParams<{id:string}>();
    const [{ patients }, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    let patient:Patient = patients[id];
    const openModal = (): void => setModalOpen(true);
    //const fetchStatus = useRef({ shouldFetch: false, hasFetched: false });

    useEffect(() => {
        const fetchPatient = async () => {
            try 
            {
                const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
                patientFromApi.isLatest = true;
                dispatch(updatePatient(patientFromApi));
            }
            catch(e)
            {
                console.error(e);
            }}
        if(!patient.isLatest)
            fetchPatient();
    },[id,dispatch])

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
      };

    const submitNewEntry = async (values: NewEntry) => {
        const body = { ...values };
    
        if (body.type === EntryType.OccupationalHealthCare) {
          if (!body.sickLeave?.endDate && !body.sickLeave?.startDate) {
            body.sickLeave = undefined;
          }
        }
    
        try {
          const { data: returnedPatient } = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${patient.id}/entries`,
            body
          );
          dispatch(updatePatient(returnedPatient));
          closeModal();
        } catch (e) {
          console.error(e.response.data);
    
          let errorMessage = "Oops! Something went wrong!";
    
          if (e.response.status >= 400 && e.response.status < 500) {
            errorMessage = e.response.data.error;
          }
    
          setError(errorMessage);
        }
      };

    return (
        <div>
            <Container textAlign="center">
                <h3>Patientor</h3>
            </Container>
            <h4>{patient.name} <Icon {...gender[patient.gender]}/></h4>
            <p>ssn:{patient.ssn}</p>
            <p>occupation:{patient.occupation}</p>
            <p>DOB:{patient.dateOfBirth}</p>

            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
                />
            <Button onClick={openModal}>Add New Entry</Button>


            <Card.Group>
                {patient.entries.map((entry) => (
                <EntryDetails key={entry.id} entry={entry} />
                ))}
            </Card.Group>
        </div>
    )
};

export default PatientPage;
