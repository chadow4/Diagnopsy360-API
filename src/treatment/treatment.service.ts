import {InjectRepository} from "@nestjs/typeorm";
import { TreatmentEntity } from './treatment.entity';
import {Repository} from "typeorm";
import {TreatmentCreateDto, TreatmentDto, TreatmentUpdateDto} from "./treatment.dto";
import {toTreatmentDto} from "../shared/mapper";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";

@Injectable()
export class TreatmentService {

    constructor(
        @InjectRepository(TreatmentEntity)
        private readonly TreatmentsRepository: Repository<TreatmentEntity>
    ) {
    }

    async showAllTreatments(): Promise<TreatmentDto[]> {
        const Treatments = await this.TreatmentsRepository.find();
        return Treatments.map(Treatment => toTreatmentDto(Treatment));
    }

    async findOneById(id: number): Promise<TreatmentDto> {
        const Treatment = await this.TreatmentsRepository.findOne({
            where: {id},
            relations: []
        });
        if (!Treatment) {
            throw new HttpException("Treatment not Found", HttpStatus.NOT_FOUND);
        }
        return toTreatmentDto(Treatment);
    }
}
