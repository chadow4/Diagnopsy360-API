import { Module } from '@nestjs/common';
import { MessageGateway } from "./message.gateway";
import { MessageService } from "./message.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiagnosisEntity } from "../diagnosis/diagnosis.entity";
import { UserEntity } from "../user/user.entity";
import { TreatmentEntity } from "../treatment/treatment.entity";
import { MessageEntity } from "./message.entity";
import { MessageController } from "./message.controller";

@Module({
  imports: [TypeOrmModule.forFeature([DiagnosisEntity, UserEntity,MessageEntity])],
  controllers: [MessageController],
  providers: [MessageGateway,MessageService],
})
export class MessageModule {}
