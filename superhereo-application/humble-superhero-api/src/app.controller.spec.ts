import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { SuperheroesService } from './superheroes/superheroes.service';
import { Superhero } from './superheroes/superhero.interface';

describe('AppController', () => {
  let appController: AppController;
  let superheroesService: SuperheroesService;

  beforeEach(async () => {
    const mockSuperheroesService = {
      findAll: jest.fn().mockReturnValue([
        { id: 1, name: 'Captain Kindness', superpower: 'Empathy', humilityScore: 9 },
        { id: 2, name: 'Humble Hero', superpower: 'Selflessness', humilityScore: 8 },
      ]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: SuperheroesService, useValue: mockSuperheroesService },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    superheroesService = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should return an array of superheroes', () => {
    const result: Superhero[] = [
      { id: 1, name: 'Captain Kindness', superpower: 'Empathy', humilityScore: 9 },
      { id: 2, name: 'Humble Hero', superpower: 'Selflessness', humilityScore: 8 },
    ];

    expect(appController.getSuperheroes()).toEqual(result);
  });

  it('should call superheroesService.findAll', () => {
    appController.getSuperheroes();
    expect(superheroesService.findAll).toHaveBeenCalled();
  });
});
