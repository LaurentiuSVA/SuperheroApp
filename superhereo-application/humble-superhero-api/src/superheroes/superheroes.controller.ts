import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { Superhero } from './superhero.interface';

@Controller('superheroes')
export class SuperheroesController {
    constructor(private readonly service: SuperheroesService) { }

    @Get()
    findAll(): Superhero[] {
        return this.service.findAll();
    }

    @Post()
    create(@Body() body: { name: string; superpower: string; humilityScore: number }): Superhero {
        return this.service.create(body);
    }

    @Delete(':id')
    delete(@Param('id') id: string): void {
        this.service.delete(Number(id));
    }
}
