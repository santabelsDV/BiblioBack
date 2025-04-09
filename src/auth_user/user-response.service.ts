import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { UserDto } from './dto/user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { UserActivateDto } from './dto/user-activate.dto';
import { JwtGenerationService } from '../jwt/jwt-services/generation.service';

@Injectable()
export class UserResponseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtGenerationService,
  ) {}

  private authorizationCodes = new Map<
    number,
    { email: string; createdAt: number }
  >();

  async userAdd(dto: UserDto) {
    if (
      (await this.prisma.user.findFirst({ where: { email: dto.email } })) ||
      (await this.prisma.user.findFirst({ where: { login: dto.login } }))
    ) {
      throw new HttpException(
        'Email already exists or login',
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword: string = crypto
      .createHash('sha256')
      .update(dto.password)
      .digest('hex');

    let randomCode = Math.floor(Math.random() * 1000000);

    if (this.authorizationCodes.has(randomCode)) {
      while (this.authorizationCodes.has(randomCode)) {
        randomCode = Math.floor(Math.random() * 1000000);
      }
    }

    this.authorizationCodes.set(randomCode, {
      email: dto.email,
      createdAt: Date.now(),
    });

    setTimeout(
      () => {
        this.authorizationCodes.delete(randomCode);
        try {
          this.prisma.user.deleteMany({ where: { email: dto.email } });
        } catch (e) {
          console.log(e);
        }
      },
      5 * 60 * 1000,
    );

    dto.status = 0;
    dto.code = randomCode;
    dto.password = hashedPassword;

    const cleanDto: Omit<UserDto, 'accessToken' | 'id' | 'refreshToken'> = {
      ...dto,
    };

    await this.prisma.user.create({ data: cleanDto });

    await this.emailService.registrationNotificationByEmail(
      dto.email,
      randomCode,
    );

    return { message: 'success. Check your email' };
  }

  async userCheck(dto: UserActivateDto) {
    const codeData = this.authorizationCodes.get(dto.code);

    if (!codeData || codeData.email !== dto.email) {
      return { message: 'invalid code or email' };
    }



    const userformDB = (
      await this.prisma.user.findMany({
        where: { email: dto.email },
      })
    )[0];

    const updatedUser: UserDto = {
      ...userformDB,
      accessToken: '',
      refreshToken: '',
      status: 1,
      firstName: userformDB.firstName ?? undefined,
      lastName: userformDB.lastName ?? undefined,
      year: userformDB.year ?? undefined,
      photo: userformDB.photo ?? undefined,
      code: userformDB.code ?? 0,
    };
    const accessToken = this.jwtService.generateAccessToken(updatedUser);
    const refreshToken = this.jwtService.generateRefreshToken(updatedUser);


    await this.prisma.user.updateMany({
      where: { email: dto.email },
      data: { accessToken, refreshToken, status: 1 },
    });

    return {
      message: 'success',
      'accessToken': accessToken,
      'refreshToken': refreshToken,
    };
  }
  async findUserByName(login: string): Promise<UserDto | null> {
    const users = await this.prisma.user.findMany({
      where: { login },
    });

    return users.length > 0 ? users[0] : null;
  }





  // async LoginUser(dto: UserLoginDto){
  //   const hashedPassword: string = crypto
  //     .createHash('sha256')
  //     .update(dto.password)
  //     .digest('hex');
  //
  //   const user : UserDto | null  = await this.prisma.user.findFirst({
  //     where: { login: dto.login, password: hashedPassword },
  //   });
  //
  //   if (!user || user.password !== hashedPassword) {
  //     throw new Error('User not found or password is incorrect');
  //   }
  //
  //   const accessToken = this.jwtService.generateAccessToken(user);
  //   const refreshToken = this.jwtService.generateRefreshToken(user);
  //
  //   await this.prisma.user.updateMany({ where: { login: dto.login }, data: { accessToken : accessToken, refreshToken: refreshToken } });
  //
  //   return { accessToken : accessToken, refreshToken: refreshToken };
  // }
}
