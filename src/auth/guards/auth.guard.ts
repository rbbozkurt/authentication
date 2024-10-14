import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService : JwtService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    try {

      const tokenPayload = await this.jwtService.verifyAsync(token);
      request.user = {
        userId: tokenPayload.sub,
        username: tokenPayload.username
      }
      return true;
    }catch(error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}