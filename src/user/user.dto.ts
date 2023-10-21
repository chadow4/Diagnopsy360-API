import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../auth/interface/role.enum";
import { DiagnosisDto } from "../diagnosis/diagnosis.dto";

export class UserCreateDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserUpdateDto {
  firstname?: string;

  lastname?: string;

  @IsEmail()
  email?: string;

  password?: string;
}

export class UserUpdatePasswordDto {
  @IsNotEmpty()
  lastPassword: string;
  @IsNotEmpty()
  newPassword: string;
}

export class UserDeleteDto {
  @IsNotEmpty()
  id: number;
}

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserDto {
  @ApiProperty({ description: "ID of the user" })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: "First name of the user" })
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ description: "Last name of the user" })
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ description: "Email of the user" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Role of the user" })
  @IsNotEmpty()
  role: Role;

}

export class DoctorDto extends UserDto {
  myPatientsDiagnoses: DiagnosisDto[];
}

export class PatientDto extends UserDto {
  myDiagnoses: DiagnosisDto[];
}
