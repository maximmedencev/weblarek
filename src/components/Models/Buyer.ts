import { IBuyer } from "../../types";
import { TPayment } from "../../types";

export class Buyer {
  private _paymentType: TPayment | null = null;
  private _email: string = "";
  private _phone: string = "";
  private _address: string = "";

  constructor() {}

  setData(data: Partial<IBuyer>): void {
    if (data.email !== undefined) {
      this._email = data.email;
    }
    if (data.phone !== undefined) {
      this._phone = data.phone;
    }
    if (data.address !== undefined) {
      this._address = data.address;
    }
  }

  getData(): IBuyer {
    return {
      paymentType: this._paymentType as TPayment,
      email: this._email,
      phone: this._phone,
      address: this._address,
    };
  }

  clear(): void {
    this._address = "";
    this._paymentType = null;
    this._email = "";
    this._phone = "";
  }

  validate(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!this._address) {
      errors.address = "Не указан адрес";
    }
    if (!this._email) {
      errors.email = "Укажите адрес электронной почты";
    }
    if (!this._paymentType) {
      errors.paymentType = "Не выбран способ оплаты";
    }
    if (!this._phone) {
      errors.phone = "Не указан номер телефона";
    }
    return errors;
  }
}
