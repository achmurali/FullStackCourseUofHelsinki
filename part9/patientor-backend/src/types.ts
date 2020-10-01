export enum Gender {
    male = "male",
    female = "female"
};

export interface Diagnose {
    code:string,
    name:string,
    latin?:string
};

export enum EntryType {
    HealthCheck = "HealthCheck",
    OccupationalHealthCare = "OccupationalHealthcare",
    Hospital = "Hospital",
  }
  
export interface BaseEntry {
    id: string;
    type: EntryType;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose["code"]>;
}
  
export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3,
  }
  
interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
  }
  
export interface SickLeave {
    startDate: string;
    endDate: string;
  }
  
interface OccupationalHealthCareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthCare;
    employerName: string;
    sickLeave?: SickLeave;
  }
  
export interface Discharge {
    date: string;
    criteria: string;
  }
  
interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital;
    discharge: Discharge;
  }
  
export type Entry =
    | HealthCheckEntry
    | OccupationalHealthCareEntry
    | HospitalEntry;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type DistributiveOmit<T, K extends keyof any> = T extends any 
    ? Omit<T, K> 
    : never;

export type NewBaseEntry = Omit<BaseEntry, "id">;

export type NewEntry = DistributiveOmit<Entry, "id">;

export interface Patient {
    id:string,
    name:string,
    dateOfBirth:string,
    ssn:string,
    gender:Gender,
    occupation:string,
    entries:Entry[]
};

export type PatientPartial = Omit<Patient,'ssn' | 'entries'>;

export type PatientEntry = Omit<Patient,'id' | "entries">;
