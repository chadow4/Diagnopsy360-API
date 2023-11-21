import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../auth/interface/role.enum";
import { DiagnosisDto } from "../diagnosis/diagnosis.dto";

export class UserCreateDto {
  @IsNotEmpty()
  @ApiProperty({ description: "Le prénom de l'utilisateur" })
  firstname: string;

  @IsNotEmpty()
  @ApiProperty({ description: "Le nom de famille de l'utilisateur" })
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: "L'email de l'utilisateur" })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: "Le mot de passe de l'utilisateur" })
  password: string;
}

export class UserUpdateDto {
  @ApiProperty({ description: "Le prénom de l'utilisateur" })
  firstname?: string;

  @ApiProperty({ description: "Le nom de famille de l'utilisateur" })
  lastname?: string;

  @IsEmail()
  @ApiProperty({ description: "L'email de l'utilisateur" })
  email?: string;

  @ApiProperty({ description: "Le mot de passe de l'utilisateur" })
  password?: string;
}

export class UserUpdatePasswordDto {
  @IsNotEmpty()
  @ApiProperty({ description: "Le dernier mot de passe de l'utilisateur" })
  lastPassword: string;

  @IsNotEmpty()
  @ApiProperty({ description: "Le nouveau mot de passe de l'utilisateur" })
  newPassword: string;
}

export class UserDeleteDto {
  @IsNotEmpty()
  @ApiProperty({ description: "L'ID de l'utilisateur à supprimer" })
  id: number;
}

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: "L'email de l'utilisateur pour la connexion" })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: "Le mot de passe de l'utilisateur pour la connexion" })
  password: string;
}

export class UserDto {
  @ApiProperty({ description: "ID de l'utilisateur" })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: "Le prénom de l'utilisateur" })
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ description: "Le nom de famille de l'utilisateur" })
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ description: "L'email de l'utilisateur" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Le rôle de l'utilisateur" })
  @IsNotEmpty()
  role: Role;

}

export class DoctorDto extends UserDto {
  @ApiProperty({ description: "Les diagnostics de mes patients" })
  myPatientsDiagnoses: DiagnosisDto[];
}

export class PatientDto extends UserDto {
  @ApiProperty({ description: "Mes diagnostics en tant que patient" })
  myDiagnoses: DiagnosisDto[];
}
