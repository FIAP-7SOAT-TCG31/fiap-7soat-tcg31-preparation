import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { IsItFridayYetSuiteSteps } from './step-definitions/is-it-friday-yet.steps';
import { PaymentSuite } from './step-definitions/payment.suite';
@Module({
  imports: [HttpModule],
  providers: [PaymentSuite, IsItFridayYetSuiteSteps],
})
export class AppModule {}
