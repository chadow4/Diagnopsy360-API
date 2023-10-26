import { UserDto } from "../user/user.dto";
import { DiagnosisDto } from "../diagnosis/diagnosis.dto";

export class MessageDto{
    id: number;
    content: string;
    createdAt: Date;
    author: UserDto;
    diagnosis: DiagnosisDto;
}

export class MessageSocketDto{
    authorId: number;
    content: string;
    diagnosisId: number;
    authorFirstname: string;
    destinationId: number;
}