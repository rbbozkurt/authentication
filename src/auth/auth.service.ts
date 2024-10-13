import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

type AuthInput = { username: string, password: string };
type SignInData = { userId: number, username: string };
type AuthResult = { accessToken: string, userId: number, username: string };

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService : JwtService
    ) { }

    async authenticate(input: AuthInput): Promise<AuthResult | null> {
        const user = await this.validateUser(input);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.signIn(user);
    }

    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const users = await this.usersService.findUserByName(input.username);
        if (users && users.password === input.password) {
            return {
                userId: users.userId,
                username: users.username
            };
        }
        return null;
    }

    async signIn( user: SignInData ): Promise<AuthResult> {
        const tokenPayload = { sub : user.userId, username: user.username };
        const accessToken = await this.jwtService.signAsync(tokenPayload);
        return {
            accessToken,
            userId: user.userId,
            username: user.username
        };
    }
}
