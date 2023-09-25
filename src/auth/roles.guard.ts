import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./interface/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    // get MetaData
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
      context.getHandler(),
      context.getClass()
    ]);
    if (!requiredRoles) {
      return true;
    }
    // get user send by JWT validation
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new UnauthorizedException("Unauthorized");
    }
    // compare requiredRoles with user role
    return requiredRoles.includes(<Role>user.role);
  }
}