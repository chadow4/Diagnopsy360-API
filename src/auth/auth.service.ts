import { JwtService } from "@nestjs/jwt";
import { RegistrationStatus } from "./interface/registration-status.interface";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoginStatus } from "./interface/login-status.interface";
import { JwtPayload } from "./interface/payload.interface";
import { UserService } from "../user/user.service";
import { UserCreateDto, UserDto, UserLoginDto } from "../user/user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {
  }

  async register(userDto: UserCreateDto) {
    try {
      await this.usersService.createUser(userDto);
    } catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(loginUserDto: UserLoginDto): Promise<LoginStatus> {
    if(!loginUserDto.email || !loginUserDto.password){
      throw new HttpException("email and password are required", HttpStatus.BAD_REQUEST);
    }
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);
    // generate and sign token
    const token = this._createToken(user);

    return {
      ...token
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findOneById(payload.id);
    if (!user) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken(user: UserDto): any {
    const expiresIn = "50m";

    const payload = { id: user.id, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload);
    return {
      expiresIn,
      accessToken
    };
  }
}