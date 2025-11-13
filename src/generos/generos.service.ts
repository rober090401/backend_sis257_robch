import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Genero } from './entities/genero.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenerosService {
  constructor(@InjectRepository(Genero) private generosRepository: Repository<Genero>) {}

  async create(createGeneroDto: CreateGeneroDto): Promise<Genero> {
    let genero = await this.generosRepository.findOneBy({
      descripcion: createGeneroDto.descripcion.trim(),
    });
    if (genero) throw new ConflictException('El género ya existe');

    genero = new Genero();
    Object.assign(genero, createGeneroDto);
    return this.generosRepository.save(genero);
  }

  async findAll(): Promise<Genero[]> {
    return this.generosRepository.find({ order: { descripcion: 'ASC' } });
  }

  async findOne(id: number): Promise<Genero> {
    const genero = await this.generosRepository.findOneBy({ id });
    if (!genero) throw new NotFoundException('El género no existe');
    return genero;
  }

  async update(id: number, updateGeneroDto: UpdateGeneroDto): Promise<Genero> {
    const genero = await this.findOne(id);
    Object.assign(genero, updateGeneroDto);
    return this.generosRepository.save(genero);
  }

  async remove(id: number): Promise<Genero> {
    const genero = await this.findOne(id);
    return this.generosRepository.softRemove(genero);
  }
}
