import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

type AuthInput = { username: string, password: string };
type SignInData = { userId: number, username: string };
type AuthResult = { accessToken : string, userId : number, username : string };

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) { }

    async authenticate(input: AuthInput): Promise<AuthResult | null> {
        const user = await this.validateUser(input);
        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        } 
        return {
            accessToken: 'fake-access',
            userId : user.userId,
            username : user.username
        }
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
}
