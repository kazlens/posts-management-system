import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(3)
  title!: string;

  @IsString()
  @MinLength(5)
  content!: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
