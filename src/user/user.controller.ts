import { Body, Controller, Delete, Get, Param, Put, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto, UserUpdateDto, UserUpdatePasswordDto } from "./user.dto";
import { HasRoles } from "../auth/has-roles.decorator";
import { Role } from "../auth/interface/role.enum";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/roles.guard";
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller("user")
@ApiBearerAuth()
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get("myinfos")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "Get current user information", description: "Returns information about the current user." })
  @ApiOkResponse({ description: "Information of the current user", type: UserDto })
  async getMyInfo(@Request() req: any): Promise<UserDto> {
    try {
      return await this.userService.findOneById(req.user.id);
    } catch (error) {
      throw error;
    }
  }


  @Put()
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "Update a user", description: "Updates a user's information." })
  @ApiOkResponse({ description: "User updated successfully" })
  @ApiBody({ type: UserUpdateDto, description: "Data for updating the user" })
  async updateUser(@Request() req: any, @Body() userUpdateDto: UserUpdateDto) {
    try {
      await this.userService.updateUser(req.user.id, userUpdateDto);
      return {
        message: "User updated successfully"
      };
    } catch (error) {
      throw error;
    }
  }

  @Put("password")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "Update user password", description: "Updates a user's password." })
  @ApiOkResponse({ description: "Password updated successfully" })
  @ApiBody({ type: UserUpdatePasswordDto, description: "Data for updating the user password" })
  async updateUserPassword(@Request() req: any, @Body() userUpdatePasswordDto: UserUpdatePasswordDto) {
    try {
      await this.userService.updateUserPassword(req.user.id, userUpdatePasswordDto);
      return {
        message: "Password updated"
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "Delete a user by ID", description: "Deletes a user by ID." })
  @ApiOkResponse({ description: "User deleted successfully" })
  @ApiParam({ name: "id", type: "number", description: "User ID to delete" })
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
