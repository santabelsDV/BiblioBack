import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BookDto_for_DB_post {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsString()
  @IsOptional()
  titlefoto: string | null;

  @IsString()
  @IsOptional()
  shortHistory: string | null;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}

export class BookDto_for_DB_get {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsString()
  @IsOptional()
  titlefoto: string | null;

  @IsString()
  @IsOptional()
  shortHistory: string | null;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
