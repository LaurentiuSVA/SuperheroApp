import { Controller, Get } from '@nestjs/common';
import { Superhero } from './superheroes/superhero.interface';
import { SuperheroesService } from './superheroes/superheroes.service';

@Controller()
export class AppController {
  constructor(private readonly superheroesService: SuperheroesService) { }

  @Get()
  getSuperheroes(): Superhero[] {
    return this.superheroesService.findAll();
  }
}
