import { BadRequestException, Injectable } from '@nestjs/common';

interface Superhero {
    id: number;
    name: string;
    superpower: string;
    humilityScore: number;
}

@Injectable()
export class SuperheroesService {
    private superheroes: Superhero[] = [
        { id: 1, name: 'Morgan Rogers', superpower: 'Dark Power', humilityScore: 9 },
        { id: 2, name: 'Antony Joshwa', superpower: 'Fire', humilityScore: 5 },
    ];

    findAll(): Superhero[] {
        return this.superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
    }

    create(superhero: Omit<Superhero, 'id'>): Superhero {
        if (!superhero.name || !superhero.superpower) {
            throw new BadRequestException('Numele și superputerea sunt obligatorii.');
        }

        if (this.superheroes.some(hero => hero.name.toLowerCase() === superhero.name.toLowerCase())) {
            throw new BadRequestException(`Supereroul cu numele "${superhero.name}" există deja.`);
        }

        if (superhero.humilityScore < 1 || superhero.humilityScore > 10) {
            throw new BadRequestException('Humility Score trebuie să fie între 1 și 10.');
        }

        const newSuperhero = { ...superhero, id: Date.now() };
        this.superheroes.push(newSuperhero);
        return newSuperhero;
    }

    delete(id: number): void {
        this.superheroes = this.superheroes.filter(hero => hero.id !== id);
    }
}
