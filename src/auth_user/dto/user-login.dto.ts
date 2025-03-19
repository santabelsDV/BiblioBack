import {  IsNotEmpty, IsString } from 'class-validator';


export class UserLoginDto{

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  login: string;
}