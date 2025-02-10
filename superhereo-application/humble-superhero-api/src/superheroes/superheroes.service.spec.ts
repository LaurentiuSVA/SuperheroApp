import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';

describe('SuperheroesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/POST /superheroes should create a superhero', async () => {
    const superheroData = {
      name: 'Super Test',
      superpower: 'Super Strength',
      humilityScore: 8,
    };

    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(superheroData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(superheroData.name);
    expect(response.body.superpower).toBe(superheroData.superpower);
    expect(response.body.humilityScore).toBe(superheroData.humilityScore);
  });

  it('/POST /superheroes should return error if name or superpower is missing', async () => {
    const superheroData = {
      name: '',
      superpower: 'Invisibility',
      humilityScore: 5,
    };

    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(superheroData)
      .expect(400);

    expect(response.body.message).toBe('Numele și superputerea sunt obligatorii.');
  });

  afterAll(async () => {
    await app.close();
  });
});
