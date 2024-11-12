import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaymentRepository } from '../abstractions/payment.repository';
import { Payment } from '../dtos/payment.dto';
import {
  GetPaymentByIdQuery,
  GetPaymentByIdResult,
} from './get-payment-by-id.query';

@QueryHandler(GetPaymentByIdQuery)
export class GetPaymentByIdHandler
  implements IQueryHandler<GetPaymentByIdQuery, GetPaymentByIdResult>
{
  constructor(private readonly repository: PaymentRepository) {}

  async execute({ id }: GetPaymentByIdQuery): Promise<GetPaymentByIdResult> {
    const result = await this.repository.findById(id);
    if (!result) {
      throw new NotFoundException();
    }

    return new GetPaymentByIdResult(
      new Payment({
        id: result.id,
        amount: result.amount,
        status: result.status,
        type: result.type,
        conciliationId: result.paymentInstruction?.conciliationId,
        content: result.paymentInstruction?.content,
        approvedAt: result.approvedAt,
        rejectedAt: result.rejectedAt,
        // createdAt: result.createdAt,
        // updatedAt: result.updatedAt,
      }),
    );
  }
}
