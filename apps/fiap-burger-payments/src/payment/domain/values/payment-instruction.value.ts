export abstract class PaymentInstruction<T = string> /* NOSONAR */ {
  abstract type: string;
  abstract content: T;

  get value() {
    return {
      type: this.type,
      content: this.content,
    };
  }
}
