import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { DiagnosisEntity } from "src/diagnosis/diagnosis.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), TypeOrmModule.forFeature([DiagnosisEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {
}
