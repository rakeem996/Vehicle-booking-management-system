import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { isAuthenticated }

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
 
    return request.isAuthenticated; 
  }
}
