import { destroyTestApp } from '@fiap-burger/test-factory/utils';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp } from './create-app';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await destroyTestApp(app);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
