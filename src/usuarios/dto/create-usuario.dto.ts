import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo usuario no debe estar vacío' })
  @IsString({ message: 'El campo usuario debe ser de tipo cadena' })
  @MaxLength(15, { message: 'El campo usuario no debe exceder los 15 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly usuario: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo email no debe estar vacío' })
  @IsString({ message: 'El campo email debe ser de tipo cadena' })
  @MaxLength(70, { message: 'El campo email no debe exceder los 70 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo rol no debe estar vacío' })
  @IsString({ message: 'El campo rol debe ser de tipo cadena' })
  @MaxLength(15, { message: 'El campo rol no debe exceder los 15 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly rol: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo rol debe estar definido' })
  @IsBoolean({ message: 'El campo rol debe ser de tipo verdadero/falso' })
  readonly premium: boolean;
}
