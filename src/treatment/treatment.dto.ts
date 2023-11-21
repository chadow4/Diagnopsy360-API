import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TreatmentCreateDto {
  @IsNotEmpty()
  @ApiProperty({ description: "Le nom du traitement" })
  name: string;
}

export class TreatmentUpdateDto {
  @ApiProperty({ description: "Le nom du traitement" })
  name?: string;
}

export class TreatmentDeleteDto {
  @IsNotEmpty()
  @ApiProperty({ description: "L'ID du traitement à supprimer" })
  id: number;
}

export class TreatmentDto {
  @ApiProperty({ description: "ID du traitement" })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: "Nom du traitement" })
  @IsNotEmpty()
  name: string;
}
