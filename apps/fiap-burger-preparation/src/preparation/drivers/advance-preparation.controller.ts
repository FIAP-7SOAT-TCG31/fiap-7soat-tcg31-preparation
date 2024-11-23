import { Controller, Param, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AdvancePreparationCommand } from '../application/commands/adavance-preparation.command';

@Controller({ version: '1', path: 'preparations' })
export class AdvancePreparationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch(':id/advance')
  async execute(@Param('id') id: string) {
    await this.commandBus.execute(new AdvancePreparationCommand(id));
  }
}
