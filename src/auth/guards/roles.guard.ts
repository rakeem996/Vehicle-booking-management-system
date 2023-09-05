import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UnauthorizedException } from '@nestjs/common';
// import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    // const { user } = context.switchToHttp().getRequest(); // Specify the correct type here
    const { user } = context.switchToHttp().getRequest();

    // console.log(context.switchToHttp().getRequest())

    if (!user) {
      throw new UnauthorizedException('User not found or invalid role data.');
    }

    return requiredRoles.some((role) => user.role.includes(role));
  }
}
