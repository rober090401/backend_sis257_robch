import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artista } from './entities/artista.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistasService {
  constructor(@InjectRepository(Artista) private artistasRepository: Repository<Artista>) {}

  async create(createArtistaDto: CreateArtistaDto): Promise<Artista> {
    let artista = await this.artistasRepository.findOneBy({
      nombre: createArtistaDto.nombre.trim(),
      nacionalidad: createArtistaDto.nacionalidad.trim(),
    });
    if (artista) throw new ConflictException('El artista ya existe');

    artista = new Artista();
    Object.assign(artista, createArtistaDto);
    return this.artistasRepository.save(artista);
  }

  async findAll(): Promise<Artista[]> {
    return this.artistasRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<Artista> {
    const artista = await this.artistasRepository.findOneBy({ id });
    if (!artista) throw new NotFoundException('El artista no existe');
    return artista;
  }

  async update(id: number, updateArtistaDto: UpdateArtistaDto): Promise<Artista> {
    const artista = await this.findOne(id);
    Object.assign(artista, updateArtistaDto);
    return this.artistasRepository.save(artista);
  }

  async remove(id: number): Promise<Artista> {
    const artista = await this.findOne(id);
    return this.artistasRepository.softRemove(artista);
  }
}
