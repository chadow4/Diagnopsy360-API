import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "../user/user.dto";
import { DiagnosisDto } from "../diagnosis/diagnosis.dto";

export class MessageDto {
    @ApiProperty({ description: "ID du message" })
    @IsNotEmpty()
    id: number;

    @ApiProperty({ description: "Contenu du message" })
    @IsNotEmpty()
    content: string;

    @ApiProperty({ description: "Date de création du message" })
    @IsNotEmpty()
    createdAt: Date;

    @ApiProperty({ description: "Auteur du message" })
    @IsNotEmpty()
    author: UserDto;
}

export class MessageSocketDto {
    @ApiProperty({ description: "ID de l'auteur du message" })
    @IsNotEmpty()
    authorId: number;

    @ApiProperty({ description: "Contenu du message" })
    @IsNotEmpty()
    content: string;

    @ApiProperty({ description: "ID du diagnostic lié au message" })
    @IsNotEmpty()
    diagnosisId: number;

    @ApiProperty({ description: "Prénom de l'auteur du message" })
    @IsNotEmpty()
    authorFirstname: string;

    @ApiProperty({ description: "ID de la destination du message" })
    @IsNotEmpty()
    destinationId: number;
}
