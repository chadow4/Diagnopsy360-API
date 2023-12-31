import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { UserEntity } from "./user/user.entity";
import { AuthModule } from "./auth/auth.module";
import { TreatmentModule } from './treatment/treatment.module';
import * as process from "process";
import { TreatmentEntity } from './treatment/treatment.entity';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { DiagnosisEntity } from "./diagnosis/diagnosis.entity";
import { MessageModule } from './message/message.module';
import { MessageEntity } from "./message/message.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity, TreatmentEntity,DiagnosisEntity,MessageEntity],
      synchronize: true
    }),
    UserModule,
    AuthModule,
    TreatmentModule,
    DiagnosisModule,
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
