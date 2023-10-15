import { Body, Controller, Delete, Get, Param, Put, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserUpdateDto } from "./user.dto";
import { HasRoles } from "../auth/has-roles.decorator";
import { Role } from "../auth/interface/role.enum";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/roles.guard";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller("user")
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async showAllUsers() {
    try {
      return await this.userService.showAllUsers();
    } catch (error) {
      throw error;
    }
  }

  @Get("myinfos")
  @UseGuards(AuthGuard("jwt"))
  async getMyInfo(@Request() req) {
    try {
      return await this.userService.findOneById(req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Get(":id")
  @HasRoles(Role.Doctor)
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  async findOneById(@Param("id") id: number) {
    try {
      return await this.userService.findOneById(id);
    } catch (error) {
      throw error;
    }
  }

  @Put()
  @UseGuards(AuthGuard("jwt"))
  async updateUser(@Request() req, @Body() userUpdateDto: UserUpdateDto) {
    try {
      await this.userService.updateUser(req.user.id, userUpdateDto);
      return {
        message: "User updated"
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiOkResponse({ description: "User deleted" })
  async deleteUser(@Param("id") id: number) {
    try {
      await this.userService.deleteUser(id);
      return {
        message: "User deleted"
      };
    } catch (error) {
      throw error;
    }

  }
}

