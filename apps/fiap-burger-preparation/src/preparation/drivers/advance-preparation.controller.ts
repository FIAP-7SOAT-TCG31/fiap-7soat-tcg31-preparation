import { Controller, Param, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AdvancePreparationCommand } from '../application/commands/adavance-preparation.command';
import { ObjectIdValidationPipe } from '../infra/pipes/object-id-validation.pipe';

@Controller({ version: '1', path: 'preparations' })
export class AdvancePreparationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch(':id/advance')
  async execute(@Param('id', new ObjectIdValidationPipe()) id: string) {
    await this.commandBus.execute(new AdvancePreparationCommand(id));
  }
}
