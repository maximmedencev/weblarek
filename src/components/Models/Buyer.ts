import { IBuyer } from "../../types";
import { TPayment } from "../../types";

type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export class Buyer {
  private payment: TPayment | null = null;
  private email: string = "";
  private phone: string = "";
  private address: string = "";

  constructor() {}

  setData(data: Partial<IBuyer>): void {
    if (data.email !== undefined) {
      this.email = data.email;
    }
    if (data.phone !== undefined) {
      this.phone = data.phone;
    }
    if (data.address !== undefined) {
      this.address = data.address;
    }
    if (data.payment !== undefined) {
      this.payment = data.payment;
    }
  }

  getData(): IBuyer {
    return {
      payment: this.payment as TPayment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  clear(): void {
    this.address = "";
    this.payment = null;
    this.email = "";
    this.phone = "";
  }

  validate(): TBuyerErrors {
    const errors: TBuyerErrors = {};

    if (!this.address) {
      errors.address = "Не указан адрес";
    }
    if (!this.email) {
      errors.email = "Укажите адрес электронной почты";
    }
    if (!this.payment) {
      errors.payment = "Не выбран способ оплаты";
    }
    if (!this.phone) {
      errors.phone = "Не указан номер телефона";
    }
    return errors;
  }
}
