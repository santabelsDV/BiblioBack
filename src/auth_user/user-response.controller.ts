import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserResponseService } from './user-response.service';
import { UserActivateDto } from './dto/user-activate.dto';
import { IdentifyUsersService } from './identify-users/identify-users.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserGuard } from './guard/guard';



@Controller('user')
export class UserResponseController {
  constructor(private readonly userResponseService: UserResponseService , private readonly IdentifyUsersService: IdentifyUsersService) {
  }

  @Post("add")
  @UsePipes(new ValidationPipe())
  async userAdd(@Body() dto: UserDto) {
    try {
      return await this.userResponseService.userAdd(dto);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post("login")
  @UseGuards(UserGuard)
  @UsePipes(new ValidationPipe())
  async userActivate(@Body() dto: UserLoginDto) {
    try {
      return await this.IdentifyUsersService.LoginUser(dto);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post("check")
  @UsePipes(new ValidationPipe())
  async userCheck(@Body() dto: UserActivateDto) {
    try {
      return await this.userResponseService.userCheck(dto);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }




}
