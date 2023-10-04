import {IsEmail, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Role} from '../auth/interface/role.enum';
export class TreatmentCreateDto {
    @IsNotEmpty()
    nane: string;

}

export class TreatmentUpdateDto {
    name?: string;
}

export class TreatmentDeleteDto {
    @IsNotEmpty()
    id: number;
}

export class TreatmentDto {
    @ApiProperty({description: 'ID of the Treatment'})
    @IsNotEmpty()
    id: number;

    @ApiProperty({description: 'Name of the Treatment'})
    @IsNotEmpty()
    name: string;
}
