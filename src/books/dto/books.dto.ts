import { IsString, IsInt } from "class-validator";

export class BooksDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsInt()
  page: number;

  @IsString()
  urlForContents: string;

  @IsInt()
  authorId: number;

}


export  type  TBooksDto = Partial<BooksDto>