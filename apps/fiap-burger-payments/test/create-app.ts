import { createTestApp as baseCreateTestApp } from '@fiap-burger/test-factory/utils';
import { AppModule } from '../src/app.module';

export const env = {
  APP_NAME: 'fiap-burger-payments-test-app',
};

export const createTestApp = (silentLogger: boolean = true) =>
  baseCreateTestApp(AppModule, { env, silentLogger });
