import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { RolesEnum } from 'src/utils/enums';

export class CreateUserDto {
  @ApiProperty({ type: String })
  @IsString({ message: 'Please enter a valid name.' })
  name: string;

  @ApiProperty({ type: String })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @ApiProperty({ type: 'enum', enum: RolesEnum, enumName: 'RolesEnum' })
  @IsEnum(RolesEnum, {
    message: 'Please select a valid role. Role must be either user or admin',
  })
  role: RolesEnum;
}
