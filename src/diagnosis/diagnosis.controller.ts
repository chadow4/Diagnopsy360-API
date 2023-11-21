import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { HasRoles } from "../auth/has-roles.decorator";
import { Role } from "../auth/interface/role.enum";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/roles.guard";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiParam } from "@nestjs/swagger";
import { DiagnosisService } from "./diagnosis.service";
import { DiagnosisDto, ResponseDiagnosisDto, SendSymptomsDiagnosisDto } from "./diagnosis.dto";

@ApiTags("Diagnosis")
@ApiBearerAuth()
@Controller("diagnosis")
export class DiagnosisController {

  constructor(private diagnosisService: DiagnosisService) {
  }

  @Get()
  @HasRoles(Role.Doctor)
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @ApiOperation({ summary: 'Get all unvalidated diagnoses', operationId: 'getDiagnosisNotValidated' })
  @ApiResponse({ status: 200, description: 'List of unvalidated diagnoses' , type: [DiagnosisDto]})
  async getDiagnosisNotValidated() {
    try {
      return this.diagnosisService.getDiagnosisNotValidated();
    } catch (error) {
      throw error;
    }
  }

  @Get("mypatientsdiags")
  @HasRoles(Role.Doctor)
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @ApiOperation({ summary: 'Get diagnoses of my patients', operationId: 'selectMyPatientDiagnosis' })
  @ApiResponse({ status: 200, description: 'List of diagnoses for my patients', type: [DiagnosisDto] })
  async selectMyPatientDiagnosis(@Request() req) {
    try {
      return await this.diagnosisService.selectMyPatientDiagnosis(req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Get("mydiags")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: 'Get diagnoses for the authenticated user', operationId: 'getMyDiagnosis' })
  @ApiResponse({ status: 200, description: 'List of diagnoses for the authenticated user' , type: [DiagnosisDto]})
  async getMyDiagnosis(@Request() req) {
    try {
      return await this.diagnosisService.getMyDiagnosis(req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: 'Get diagnosis by ID', operationId: 'getDiagnosisById' })
  @ApiParam({ name: "id", description: "ID of the diagnosis to fetch" })
  @ApiResponse({ status: 200, description: 'Diagnosis details', type: DiagnosisDto })
  async getDiagnosisById(@Request() req: any, @Param("id") diagnosisId: number) {
    try {
      return this.diagnosisService.getDiagnosisById(diagnosisId, req.user.id, req.user.role);
    } catch (error) {
      throw error;
    }
  }

  @Post("send")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: 'Send symptoms for diagnosis', operationId: 'sendSymptomsDiagnosis' })
  @ApiResponse({ status: 200, description: 'Symptoms sent successfully' })
  @ApiBody({ type: SendSymptomsDiagnosisDto })
  async sendSymptomsDiagnosis(@Request() req: any, @Body() sendSymptomsDiagnosisDto: SendSymptomsDiagnosisDto) {
    try {
      await this.diagnosisService.sendSymptomsDiagnosis(sendSymptomsDiagnosisDto, req.user.id);
      return {
        message: "Your symptoms have been sent"
      };
    } catch (error) {
      throw error;
    }
  }

  @Put("select/:id")
  @HasRoles(Role.Doctor)
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @ApiOperation({ summary: 'Select a diagnosis by ID (for doctors)', operationId: 'selectDoctorDiagnosis' })
  @ApiParam({ name: "id", description: "ID of the diagnosis to select" })
  @ApiResponse({ status: 200, description: 'Diagnosis selected successfully' })
  async selectDoctorDiagnosis(@Request() req: any, @Param("id") diagnosisId: number) {
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
  @ApiOperation({ summary: 'Create a response for a diagnosis (for doctors)', operationId: 'createResponseDiagnosis' })
  @ApiParam({ name: "id", description: "ID of the diagnosis to respond to" })
  @ApiResponse({ status: 200, description: 'Response created successfully' })
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
