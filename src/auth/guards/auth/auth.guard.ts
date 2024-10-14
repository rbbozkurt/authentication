import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      return false;
    }

    const token = authorization.split(' ')[1];

    // Add your token validation logic here
    const isValidToken = await this.validateToken(token);

    return isValidToken;
  }

  private async validateToken(token: string): Promise<boolean> {
    // Implement your token validation logic here
    // For example, you could verify the token with a secret or check its expiration
    return token === 'valid-token'; // Replace this with actual validation logic
  }
}