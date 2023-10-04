import { ApiTags } from "@nestjs/swagger";
import { TreatmentService } from './treatment.service';
import { Body, Controller, UseGuards, Get, Param} from "@nestjs/common";
import { HasRoles } from "../auth/has-roles.decorator";
import { Role } from "../auth/interface/role.enum";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Treatment")
@Controller('treatment')
export class TreatmentController {
    constructor(private treatmentService: TreatmentService) {
    }

    @Get(":id")
    @UseGuards(AuthGuard("jwt"))
    @HasRoles(Role.Admin)
    async findOneById(@Param("id") id: number) {
    try {
      return await this.treatmentService.findOneById(id);
    } catch (error) {
      throw error;
    }
  }

    @Get()
    @UseGuards(AuthGuard("jwt"))
    async showAllTreatments() {
        try {
        return await this.treatmentService.showAllTreatments();
        } catch (error) {
        throw error;
        }
    }
}
