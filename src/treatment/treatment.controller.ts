import { ApiTags } from "@nestjs/swagger";
import { TreatmentService } from "./treatment.service";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { HasRoles } from "../auth/has-roles.decorator";
import { Role } from "../auth/interface/role.enum";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/roles.guard";

@ApiTags("Treatment")
@Controller("treatment")
export class TreatmentController {
  constructor(private treatmentService: TreatmentService) {
  }

  @Get(":id")
  @HasRoles(Role.Doctor)
  @UseGuards(AuthGuard("jwt"), RolesGuard)
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
  async showAllTreatments() {
    try {
      return await this.treatmentService.showAllTreatments();
    } catch (error) {
      throw error;
    }
  }
}
