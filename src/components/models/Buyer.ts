import { IBuyer } from "../../types";
import { TPayment } from "../../types";
import { IEvents } from "../base/Events";
import { EVENTS } from "../../types";

export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export class Buyer {
  private payment: TPayment | null = null;
  private email: string = "";
  private phone: string = "";
  private address: string = "";

  constructor(protected events: IEvents) {}

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
    this.events.emit(EVENTS.buyer.dataChanged);
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

  setPayment(payment: TPayment): void {
    this.payment = payment;
    this.events.emit(EVENTS.buyer.paymentChanged, { payment });
  }

  setAddress(address: string): void {
    this.address = address;
    this.events.emit(EVENTS.buyer.addressChanged);
  }

  setEmail(email: string): void {
    this.email = email;
    this.events.emit(EVENTS.buyer.emailChanged);
  }

  setPhone(phone: string): void {
    this.phone = phone;
    this.events.emit(EVENTS.buyer.phoneChanged);
  }

  validate(): TBuyerErrors {
    const errors: TBuyerErrors = {};
    if (!this.address || this.address === "") {
      errors.address = "Не указан адрес";
    }
    if (!this.email || this.email === "") {
      errors.email = "Укажите адрес электронной почты";
    }
    if (!this.payment) {
      errors.payment = "Не выбран способ оплаты";
    }
    if (!this.phone || this.phone === "") {
      errors.phone = "Не указан номер телефона";
    }
    return errors;
  }
}
