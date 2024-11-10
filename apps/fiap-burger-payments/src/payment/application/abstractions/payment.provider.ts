export abstract class PaymentProvider {
  abstract createPixQRCode(
    conciliationId: string,
    amount: number,
  ): Promise<string>;
}
