import { DoctorDto, PatientDto, UserDto } from "../user/user.dto";
import { TreatmentDto } from "../treatment/treatment.dto";
import { UserEntity } from "../user/user.entity";
import { TreatmentEntity } from "../treatment/treatment.entity";
import { DiagnosisEntity } from "../diagnosis/diagnosis.entity";
import { DiagnosisDto } from "../diagnosis/diagnosis.dto";
import { MessageDto } from "../message/message.dto";
import { MessageEntity } from "../message/message.entity";


export const toUserDto = (data: UserEntity): UserDto => {
  const { id, firstname, lastname, email, role, myDiagnoses, myPatientsDiagnoses } = data;
  return <UserDto><unknown>{
    id,
    firstname,
    lastname,
    email,
    role
  };
};


export const toPatientDto = (data: UserEntity): UserDto => {
  const { id, firstname, lastname, email, role, myDiagnoses } = data;
  return <PatientDto><unknown>{
    id,
    firstname,
    lastname,
    email,
    role,
    myDiagnoses: myDiagnoses && myDiagnoses.map(diagnosis => toDiagnosisDto(diagnosis))
  };
};

export const toDoctorDto = (data: UserEntity): UserDto => {
  const { id, firstname, lastname, email, role, myPatientsDiagnoses } = data;
  return <DoctorDto><unknown>{
    id,
    firstname,
    lastname,
    email,
    role,
    myPatientsDiagnoses: myPatientsDiagnoses && myPatientsDiagnoses.map(diagnosis => toDiagnosisDto(diagnosis))
  };
};

export const toTreatmentDto = (data: TreatmentEntity): TreatmentDto => {
  const { id, name } = data;
  return <TreatmentDto><unknown>{
    id,
    name
  };
};

export const toMessageDto = (data: MessageEntity): MessageDto => {
  const { id, content, createdAt, author, diagnosis } = data;
  return <MessageDto><unknown>{
    id,
    content,
    createdAt,
    author: author && toUserDto(author),
    diagnosis: diagnosis && toDiagnosisDto(diagnosis)
  };
};


export const toDiagnosisDto = (data: DiagnosisEntity): DiagnosisDto => {
  const { id, diagnosisDate, symptoms, diagnosisResponse, diagnosisValidated, patient, doctor, treatments } = data;
  return <DiagnosisDto><unknown>{
    id,
    diagnosisDate,
    symptoms,
    diagnosisResponse,
    diagnosisValidated,
    patient: patient && toUserDto(patient),
    doctor: doctor && toUserDto(doctor),
    treatments: treatments && treatments.map(treatment => toTreatmentDto(treatment))
  };
};

