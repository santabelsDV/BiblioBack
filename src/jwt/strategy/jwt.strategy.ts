import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private prisma: PrismaService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { login: username },
    });

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Невірний логін або пароль');
    }

    return { ...user, password: '-----' , login: '-----'};
  }
}
