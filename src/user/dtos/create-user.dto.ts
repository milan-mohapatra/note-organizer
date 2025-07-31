import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'name is a string typed' })
  @IsNotEmpty({ message: "name can't be empty" })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: "email can't be empty" })
  email: string;

  @IsAlphanumeric()
  @MinLength(5)
  @MaxLength(10)
  password: string;
}
