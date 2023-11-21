import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "../user/user.dto";
import { TreatmentDto } from "../treatment/treatment.dto";

export class SendSymptomsDiagnosisDto {
    @ApiProperty({ description: "Liste des symptômes" })
    symptoms: string[];
}

export class ResponseDiagnosisDto {
    @ApiProperty({ description: "Réponse du diagnostic" })
    diagnosisResponse: string;

    @ApiProperty({ description: "Liste des IDs de traitements recommandés" })
    treatmentIds: number[];
}

export class DiagnosisDto {
    @ApiProperty({ description: "ID du diagnostic" })
    @IsNotEmpty()
    id: number;

    @ApiProperty({ description: "Nom du diagnostic" })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: "Date du diagnostic" })
    @IsNotEmpty()
    diagnosisDate: Date;

    @ApiProperty({ description: "Liste des symptômes du diagnostic" })
    @IsNotEmpty()
    symptoms: string[];

    @ApiProperty({ description: "Réponse du diagnostic" })
    @IsNotEmpty()
    diagnosisResponse: string;

    @ApiProperty({ description: "Statut de validation du diagnostic" })
    @IsNotEmpty()
    diagnosisValidated: boolean;

    @ApiProperty({ description: "Patient associé au diagnostic" })
    @IsNotEmpty()
    patient: UserDto;

    @ApiProperty({ description: "Médecin associé au diagnostic" })
    @IsNotEmpty()
    doctor: UserDto;

    @ApiProperty({ description: "Liste des traitements associés au diagnostic" })
    @IsNotEmpty()
    treatments: TreatmentDto[];
}
