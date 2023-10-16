import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { HasRoles } from "../auth/has-roles.decorator";
import { Role } from "../auth/interface/role.enum";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/roles.guard";
import { ApiTags } from "@nestjs/swagger";
import { DiagnosisService } from "./diagnosis.service";
import { ResponseDiagnosisDto, SendSymtomsDiagnosisDto } from "./diagnosis.dto";

@ApiTags("Diagnosis")
@Controller("diagnosis")
export class DiagnosisController {

  constructor(private diagnosisService: DiagnosisService) {
  }

  @Get()
  @HasRoles(Role.Doctor)
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  async getDiagnosisNotValidated() {
    try {
      return this.diagnosisService.getDiagnosisNotValidated();
    } catch (error) {
      throw error;
    }
  }

  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  async getDiagnosisById(@Request() req, @Param("id") diagnosisId: number) {
    try {
      return this.diagnosisService.getDiagnosisById(diagnosisId, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Post("send")
  @UseGuards(AuthGuard("jwt"))
  async sendSymptomsDiagnosis(@Request() req, @Body() sendSymptomsDiagnosisDto: SendSymtomsDiagnosisDto) {
    try {
      await this.diagnosisService.sendSymptomsDiagnosis(sendSymptomsDiagnosisDto, req.user.id);
      return {
        message: "your symptoms have been sent"
      };
    } catch (error) {
      throw error;
    }
  }

  @Put("select/:id")
  @HasRoles(Role.Doctor)
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  async selectDoctorDiagnosis(@Request() req, @Param("id") diagnosisId: number) {
    try {
      await this.diagnosisService.selectDoctorDiagnosis(diagnosisId, req.user.id);
      return {
        message: "You have selected this diagnosis"
      };
    } catch (error) {
      throw error;
    }
  }

  @Put("response/:id")
  @HasRoles(Role.Doctor)
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  async createResponseDiagnosis(@Request() req, @Param("id") diagnosisId, @Body() responseDiagnosisDto: ResponseDiagnosisDto) {
    try {
      await this.diagnosisService.createResponseDiagnosis(responseDiagnosisDto, req.user.id, diagnosisId);
      return {
        message: "You have responded to this diagnosis"
      };
    } catch (error) {
      throw error;
    }
  }


}

