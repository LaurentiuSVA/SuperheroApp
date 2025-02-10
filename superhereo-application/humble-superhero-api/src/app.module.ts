import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuperheroesController } from './superheroes/superheroes.controller';
import { SuperheroesService } from './superheroes/superheroes.service';

@Module({
  imports: [],
  controllers: [AppController, SuperheroesController],
  providers: [AppService, SuperheroesService],
})
export class AppModule { }
