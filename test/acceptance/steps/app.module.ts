import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HelloWorldSuite } from './step-definitions/hello-world.suite';
import { IsItFridayYetSuiteSteps } from './step-definitions/is-it-friday-yet.steps';
@Module({
  imports: [HttpModule],
  providers: [HelloWorldSuite, IsItFridayYetSuiteSteps],
})
export class AppModule {}
