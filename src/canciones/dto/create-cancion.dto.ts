import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCancionDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo id del album debe estar definido' })
  @IsInt({ message: 'El campo id del album debe ser numérico' })
  idAlbum: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo id del genero debe estar definido' })
  @IsInt({ message: 'El campo id del genero debe ser numérico' })
  idGenero: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe estar vacío' })
  @IsString({ message: 'El campo nombre debe ser de tip cadena' })
  @MaxLength(40, { message: 'El campo nombre no debe exceder los 40 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo duracion no debe estar vacío' })
  @IsString({ message: 'El campo duracion debe ser de tip cadena' })
  @MaxLength(8, { message: 'El campo duracion no debe exceder los 8 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  duracion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo tags no debe estar vacío' })
  @IsString({ message: 'El campo tags debe ser de tip cadena' })
  @MaxLength(30, { message: 'El campo tags no debe exceder los 30 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  tags: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo url no debe estar vacío' })
  @IsString({ message: 'El campo url debe ser de tip cadena' })
  @MaxLength(250, { message: 'El campo url no debe exceder los 250 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  url: string;
}
