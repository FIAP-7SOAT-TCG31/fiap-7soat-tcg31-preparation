import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import MercadoPagoConfig, { Payment } from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  constructor(private readonly config: ConfigService) {}

  async create() {
    const accessToken = this.config.getOrThrow('MERCADO_PAGO_ACCESS_TOKEN');
    const clientConfig = new MercadoPagoConfig({ accessToken, options: {} });

    const payment = new Payment(clientConfig);

    const result = await payment
      .create({
        body: {
          transaction_amount: 1.99,
          description: 'Pedido Teste 123',
          payment_method_id: 'pix',
          notification_url:
            'https://01j76s6kw5q38tbvhc4xq6fs7s10-6f55a0fafffb9b7b2abf.requestinspector.com/',
          callback_url:
            'https://01j76s6kw5q38tbvhc4xq6fs7s10-6f55a0fafffb9b7b2abf.requestinspector.com/',
          payer: {
            first_name: 'Jack',
            last_name: 'Sparrow',
            email: 'jack@sparrow.com',
          },
        },
        requestOptions: {
          idempotencyKey: randomUUID(),
        },
      })
      .catch((err) => {
        console.log(err);
        console.log('deu ruim');
      });

    console.log(result);
  }
}
