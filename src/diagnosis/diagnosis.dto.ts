import { IsNotEmpty } from "class-validator";
import { UserDto } from "../user/user.dto";
import { TreatmentDto } from "../treatment/treatment.dto";

export class SendSymtomsDiagnosisDto {
    symptoms: string[];
}

export class ResponseDiagnosisDto {
    diagnosisResponse: string;
    treatmentIds: number[];
}


export class DiagnosisDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    diagnosisDate: Date;

    @IsNotEmpty()
    symptoms: string[];

    @IsNotEmpty()
    diagnosisResponse: string;

    @IsNotEmpty()
    diagnosisValidated: boolean;

    patient: UserDto;

    doctor: UserDto;

    treatments: TreatmentDto[];


}
