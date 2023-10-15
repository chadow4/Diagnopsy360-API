import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserCreateDto, UserDto, UserLoginDto, UserUpdateDto } from "./user.dto";
import { toDoctorDto, toPatientDto, toUserDto } from "../shared/mapper";
import { Role } from "../auth/interface/role.enum";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>
    ) {
    }

    async showAllUsers(): Promise<UserDto[]> {
        const users = await this.usersRepository.find();
        return users.map(user => toUserDto(user));
    }

    async findOneById(id: number): Promise<UserDto> {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ["myDiagnoses", "myDiagnoses.doctor", "myDiagnoses.treatments", "myPatientsDiagnoses", "myPatientsDiagnoses.patient", "myPatientsDiagnoses.treatments"]
        });
        if (!user) {
            throw new HttpException("User not Found", HttpStatus.NOT_FOUND);
        }
        return user.role === "patient" ? toPatientDto(user) : toDoctorDto(user);
    }

    async findOneByEmail(email: string): Promise<UserDto> {
        const user = await this.usersRepository.findOne({
            where: { email },
            relations: []
        });
        if (!user) {
            throw new HttpException("User not Found", HttpStatus.NOT_FOUND);
        }
        return toUserDto(user);
    }

    async findByLogin({ email, password }: UserLoginDto): Promise<UserDto> {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new HttpException("User not Found", HttpStatus.BAD_REQUEST);
        }
        const areEqual = await bcrypt.compare(password, user.password);
        if (!areEqual) {
            throw new HttpException("Wrong Password", HttpStatus.BAD_REQUEST);
        }
        return toUserDto(user);
    }

    async createUser(userCreateDto: UserCreateDto): Promise<void> {
        if (!userCreateDto.firstname || !userCreateDto.lastname || !userCreateDto.email || !userCreateDto.password) {
            throw new HttpException("Missing Fields", HttpStatus.BAD_REQUEST);
        }
        const existingUser = await this.usersRepository.findOne({ where: { email: userCreateDto.email } });
        if (existingUser) {
            throw new HttpException("User Already Exist", HttpStatus.CONFLICT);
        }
        const user = this.usersRepository.create(userCreateDto);
        user.role = <Role>"patient";
        try {
            await this.usersRepository.save(user);
        } catch (error) {
            throw new HttpException("Error Creating User", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUser(sessionId: number, userUpdateDto: UserUpdateDto) {
        const user = await this.usersRepository.findOne({ where: { id: sessionId } });
        if (!user) {
            throw new HttpException("User not Found", HttpStatus.NOT_FOUND);
        }

        // Update the user object with the values from the userUpdateDto
        Object.assign(user, userUpdateDto);

        try {
            await this.usersRepository.save(user);
        } catch (error) {
            throw new HttpException("Error Updating User", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteUser(idUser: number) {
        const user = await this.usersRepository.findOne({ where: { id: idUser } });
        if (!user) {
            throw new HttpException("User not Found", HttpStatus.NOT_FOUND);
        }
        await this.usersRepository.remove(user);
    }

}
