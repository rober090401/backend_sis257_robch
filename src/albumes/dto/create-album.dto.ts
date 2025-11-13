import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsDefined, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo id del artista debe estar definido' })
  @IsInt({ message: 'El campo id del artista debe ser numérico' })
  idArtista: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe estar vacío' })
  @IsString({ message: 'El campo nombre debe ser de tip cadena' })
  @MaxLength(60, { message: 'El campo nombre no debe exceder los 60 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  nombre: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo fecha de lanzamiento debe estar definido' })
  @IsDateString({}, { message: 'El campo fecha de lanzamiento debe ser una fecha válida' })
  fechaLanzamiento: Date;
}
