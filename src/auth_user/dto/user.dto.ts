import {
  IsString,
  IsInt,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  MinLength, MaxLength, Min, Max,
} from 'class-validator';
export class UserDto {

  @IsInt()
  @Min(1)
  @IsOptional()
  id: number;

  @IsString()
  @MaxLength(150)
  @MinLength(1)
  @IsNotEmpty()
  login: string;

  @IsString()
  @MinLength(8)
  @MaxLength(25)
  @IsNotEmpty()
  password: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  firstName?: string | null;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  lastName?: string | null;

  @IsInt()
  @IsOptional()
  year?: number | null;

  @IsString()
  @IsOptional()
  accessToken: string | null;

  @IsString()
  @IsOptional()
  refreshToken: string |  null;

  @IsEmail()
  email: string;

  @IsInt()
  @Min(0)
  @Max(3)
  @IsOptional()
  status: number;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  photo?: string | null;

  @IsInt()
  @Min(100)
  @Max(10000)
  @IsOptional()
  code: number | null;




}


export  type  TBooksDto = Partial<UserDto>