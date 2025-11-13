import { Module } from '@nestjs/common';
import { ArtistasService } from './artistas.service';
import { ArtistasController } from './artistas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artista } from './entities/artista.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artista])],
  controllers: [ArtistasController],
  providers: [ArtistasService],
})
export class ArtistasModule {}
