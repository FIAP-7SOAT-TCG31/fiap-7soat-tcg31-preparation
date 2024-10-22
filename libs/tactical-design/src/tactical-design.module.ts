import { Module } from '@nestjs/common';
import { TacticalDesignService } from './tactical-design.service';

@Module({
  providers: [TacticalDesignService],
  exports: [TacticalDesignService],
})
export class TacticalDesignModule {}
