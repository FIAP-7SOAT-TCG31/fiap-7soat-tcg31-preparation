import { Transactional } from '@fiap-burger/tactical-design/core';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PaymentFactory } from '../abstractions/payment.factory';
import {
  CreatePaymentCommand,
  CreatePaymentResult,
} from './create-payment.command';

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler
  implements ICommandHandler<CreatePaymentCommand, CreatePaymentResult>
{
  constructor(private readonly paymentFactory: PaymentFactory) {}

  @Transactional()
  async execute({ data }: CreatePaymentCommand): Promise<CreatePaymentResult> {
    const payment = await this.paymentFactory.create(data.type, data.amount);

    await payment.commit();
    return new CreatePaymentResult({ id: payment.id });
  }
}
