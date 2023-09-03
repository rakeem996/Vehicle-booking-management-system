import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
// import { AppService } from './app.service';
// import { LocalAuthGuard } from './auth/local-auth.guard';
// import { AuthenticatedGuard } from './auth/authenticated.guard';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';

@ApiTags('Authentication')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // login(@Request() req): any {
  //   return this.authService.login(req.user);
  // }

  // @Get('protected')
  // getHello(@Request() req): any {
  //   return req.user;
  // }

  // @Get('/logout')
  // logout(@Request() req): any {
  //   req.session.destroy();
  //   return { msg: 'The user session has ended' };
  // }
}
