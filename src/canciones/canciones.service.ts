import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCancionDto } from './dto/create-cancion.dto';
import { UpdateCancionDto } from './dto/update-cancion.dto';
import { Cancion } from './entities/cancion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CancionesService {
  constructor(@InjectRepository(Cancion) private cancionesRepository: Repository<Cancion>) {}

  async create(createCancionDto: CreateCancionDto): Promise<Cancion> {
    let cancion = await this.cancionesRepository.findOneBy({
      idAlbum: createCancionDto.idAlbum,
      idGenero: createCancionDto.idGenero,
      nombre: createCancionDto.nombre,
    });
    if (cancion) throw new ConflictException('La canción ya existe');

    cancion = new Cancion();
    Object.assign(cancion, createCancionDto);
    return this.cancionesRepository.save(cancion);
  }

  async findAll(): Promise<Cancion[]> {
    return this.cancionesRepository.find({
      relations: { album: { artista: true }, genero: true },
      select: {
        id: true,
        nombre: true,
        duracion: true,
        tags: true,
        url: true,
        album: { id: true, nombre: true, artista: { id: true, nombre: true, fotografia: true } },
        genero: { id: true, descripcion: true },
      },
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Cancion> {
    const cancion = await this.cancionesRepository.findOne({
      where: { id },
      relations: { album: true, genero: true },
    });
    if (!cancion) throw new NotFoundException('La canción no existe');
    return cancion;
  }

  async update(id: number, updateCancionDto: UpdateCancionDto): Promise<Cancion> {
    const cancion = await this.cancionesRepository.findOneBy({ id });
    if (!cancion) throw new NotFoundException('La canción no existe');

    Object.assign(cancion, updateCancionDto);
    return this.cancionesRepository.save(cancion);
  }

  async remove(id: number): Promise<Cancion> {
    const cancion = await this.findOne(id);
    return this.cancionesRepository.softRemove(cancion);
  }
}
