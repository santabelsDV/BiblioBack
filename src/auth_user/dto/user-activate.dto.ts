import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';


export class UserActivateDto{

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  code: number;

}