import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { UserDto } from "../user/user.dto";

export class SendSymtomsDiagnosisDto {
    symptoms : string[];
}

export class ResponseDiagnosisDto{
    diagnosisResponse : string;
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


}
