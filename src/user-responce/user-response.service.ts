import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserResponseService {
  constructor(private readonly prisma: PrismaService) {}

  UserAdd(dto: UserDto) {
    return  this.prisma.user.create({ data: dto });
  }
}
