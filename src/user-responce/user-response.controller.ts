import { Body, Controller, Post } from '@nestjs/common';
import { UserResponseService } from './user-response.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserResponseController {
  constructor(private readonly userResponceService: UserResponseService) {
  }

  @Post("add")
  async UserAdd(@Body() dto: UserDto) {
    return this.userResponceService.UserAdd(dto);
  }

}
