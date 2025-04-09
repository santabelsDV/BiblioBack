import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BookDto_for_user_request {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsString()
  @IsOptional()
  titlefoto: string;

  @IsString()
  @IsOptional()
  shortHistory: string;

  @IsString()
  @IsNotEmpty()
  authorName: string;
}
