import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TreatmentService } from "./treatment.service";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { HasRoles } from "../auth/has-roles.decorator";
import { Role } from "../auth/interface/role.enum";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/roles.guard";
import { TreatmentDto } from "./treatment.dto"; // Import TreatmentDto

@ApiTags("Treatment")
@ApiBearerAuth()
@Controller("treatment")
export class TreatmentController {
  constructor(private treatmentService: TreatmentService) {
  }

  @Get(":id")
  @HasRoles(Role.Doctor)
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @ApiOperation({ summary: 'Get treatment by ID', operationId: 'findOneById' })
  @ApiParam({ name: "id", description: "ID of the treatment to fetch" })
  @ApiResponse({ status: 200, description: "Returns the found treatment.", type: TreatmentDto })
  @ApiResponse({ status: 400, description: "Treatment was not found." })
  async findOneById(@Param("id") id: number) {
    try {
      return await this.treatmentService.findOneById(id);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  @HasRoles(Role.Doctor)
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @ApiOperation({ summary: 'Get all treatments', operationId: 'showAllTreatments' })
  @ApiResponse({ status: 200, description: "Returns all treatments.", type: [TreatmentDto] })
  async showAllTreatments() {
    try {
      return await this.treatmentService.showAllTreatments();
    } catch (error) {
      throw error;
    }
  }
}
