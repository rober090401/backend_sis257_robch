import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class AlbumesService {
  constructor(@InjectRepository(Album) private albumesRepository: Repository<Album>) {}

  async create(createAlbumeDto: CreateAlbumDto): Promise<Album> {
    let album = await this.albumesRepository.findOneBy({
      idArtista: createAlbumeDto.idArtista,
      nombre: createAlbumeDto.nombre,
    });
    if (album) throw new ConflictException('El álbum ya existe');

    album = new Album();
    Object.assign(album, createAlbumeDto);
    return this.albumesRepository.save(album);
  }

  async findAll(parametro?: string): Promise<Album[]> {
    return this.albumesRepository.find({
      where: { nombre: ILike(`%${parametro ?? ''}%`) },
      relations: { artista: true },
      select: {
        id: true,
        nombre: true,
        fechaLanzamiento: true,
        artista: { id: true, nombre: true },
      },
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Album> {
    const album = await this.albumesRepository.findOne({
      where: { id },
      relations: { artista: true },
    });
    if (!album) throw new NotFoundException('El álbum no existe');
    return album;
  }

  async findByArtista(idArtista: number): Promise<Album[]> {
    return await this.albumesRepository.find({
      where: { idArtista },
      order: { nombre: 'ASC' },
    });
  }

  async update(id: number, updateAlbumeDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);
    Object.assign(album, updateAlbumeDto);
    return this.albumesRepository.save(album);
  }

  async remove(id: number): Promise<Album> {
    const album = await this.findOne(id);
    return this.albumesRepository.softRemove(album);
  }
}
