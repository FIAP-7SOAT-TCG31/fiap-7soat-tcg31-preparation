import { Module } from '@nestjs/common';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [DriversModule],
})
export class PreparationModule {}
