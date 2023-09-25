import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegistrationStatus } from "./interface/registration-status.interface";
import { LoginStatus } from "./interface/login-status.interface";
import {UserCreateDto, UserDto, UserLoginDto} from "../user/user.dto";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";


@ApiTags('Auth')
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("register")
  @ApiOkResponse({ description: 'User registered successfully'})
  public async register(@Body() createUserDto: UserCreateDto) {
    try{
        await this.authService.register(createUserDto);
        return {
            message: "User registration successful"
        }
    }catch (error){
     throw error;
    }
  }

  @Post("login")
  @ApiOkResponse({ description: 'Login Status', type: LoginStatus })
  public async login(@Body() loginUserDto: UserLoginDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }
}