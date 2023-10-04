import { Module } from '@nestjs/common';
import { TreatmentController } from './treatment.controller';
import { TreatmentService } from './treatment.service';
import { TreatmentEntity } from './treatment.entity';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([TreatmentEntity])],
  controllers: [TreatmentController],
  providers: [TreatmentService]
})
export class TreatmentModule {}
