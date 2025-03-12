import {
  IsString,
  IsInt,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  MinLength, MaxLength, Min,
} from 'class-validator';
import { BooksDto } from '../../books/dto/books.dto';

export class UserDto {

  @IsInt()
  @Min(1)
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
  firstName?: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  lastName?: string;

  @IsInt()
  @IsOptional()
  year?: number;

  @IsString()
  @MaxLength(1000)
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @MaxLength(1000)
  @IsNotEmpty()
  refreshToken: string;

  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(50)
  satus: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  foto?: string;
}


export  type  TBooksDto = Partial<BooksDto>