import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserResponseService } from '../auth_user/user-response.service';
import crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

type AuthInput = {
  login: string;
  password: string;
};
export type SignInData = {
  userId: number;
  username: string;
};
type AuthResult = {
  accessToken: string;
  userid: number;
  username: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly uderservice: UserResponseService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException('incorrect login or password');
    }

    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.uderservice.findUserByName(input.login);

    const hashedPassword: string = crypto
      .createHash('sha256')
      .update(input.password)
      .digest('hex');



    if (user !== null && user.password === hashedPassword) {
      return {
        userId: user.id,
        username: user.login,
      };
    }
    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      username: user.username,
    };
    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken,
      userid: user.userId,
      username: user.username,
    };
  }
  //sadas
}
