import { UserDto } from "../user/user.dto";
import { TreatmentDto } from "../treatment/treatment.dto";
import { UserEntity } from "../user/user.entity";
import { TreatmentEntity } from "../treatment/treatment.entity";
import { DiagnosisEntity } from "../diagnosis/diagnosis.entity";
import { DiagnosisDto } from "../diagnosis/diagnosis.dto";


export const toUserDto = (data: UserEntity): UserDto => {
  const { id, firstname, lastname, email, role,myDiagnoses,myPatientsDiagnoses} = data;
  return <UserDto><unknown>{
    id,
    firstname,
    lastname,
    email,
    role,
    myDiagnoses: myDiagnoses && myDiagnoses.map(diagnosis => toDiagnosisDto(diagnosis)),
    myPatientsDiagnoses: myPatientsDiagnoses && myPatientsDiagnoses.map(diagnosis => toDiagnosisDto(diagnosis))
  };
};

export const toTreatmentDto = (data: TreatmentEntity): TreatmentDto => {
  const { id, name} = data;
  return <TreatmentDto><unknown>{
    id,
    name
  };
};


export const toDiagnosisDto = (data: DiagnosisEntity): DiagnosisDto => {
  const { id, diagnosisDate, symptoms, diagnosisResponse, diagnosisValidated, patient, doctor } = data;
  return <DiagnosisDto><unknown>{
    id,
    diagnosisDate,
    symptoms,
    diagnosisResponse,
    diagnosisValidated,
    patient: patient && toUserDto(patient),
    doctor: doctor && toUserDto(doctor)
  };
}
