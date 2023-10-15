import { Module } from "@nestjs/common";
import { DiagnosisController } from "./diagnosis.controller";
import { DiagnosisService } from "./diagnosis.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/user.entity";
import { DiagnosisEntity } from "./diagnosis.entity";
import { TreatmentEntity } from "../treatment/treatment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DiagnosisEntity, UserEntity,TreatmentEntity])],
  controllers: [DiagnosisController],
  providers: [DiagnosisService]
})
export class DiagnosisModule {
}
