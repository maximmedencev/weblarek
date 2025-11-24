import { Form } from "./Form";
import { IBuyer, TPayment } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { TBuyerErrors } from "../../models/Buyer";
import { EVENTS } from "../../../types";

export type TOrderFormData = Pick<IBuyer, "payment" | "address">;

export class OrderForm extends Form<TOrderFormData> {
  protected onlineButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container, events);

    this.onlineButton = ensureElement<HTMLButtonElement>(
      'button[name="card"]',
      container
    );
    this.cashButton = ensureElement<HTMLButtonElement>(
      'button[name="cash"]',
      container
    );
    this.addressInput = ensureElement<HTMLInputElement>(
      '.form__input[name="address"]',
      container
    );

    this.onlineButton.addEventListener("click", () =>
      this.events.emit(EVENTS.order.payment, { payment: "online" })
    );
    this.cashButton.addEventListener("click", () =>
      this.events.emit(EVENTS.order.payment, { payment: "cash" })
    );
    this.addressInput.addEventListener("input", () =>
      this.events.emit(EVENTS.order.address, {
        address: this.addressInput.value,
      })
    );
    this.container.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      this.events.emit(EVENTS.order.submit);
    });
  }

  set payment(payment: TPayment) {
    this.onlineButton.classList.remove("button_alt-active");
    this.cashButton.classList.remove("button_alt-active");

    if (!payment) {
      return;
    }

    if (payment === "online") {
      this.onlineButton.classList.add("button_alt-active");
    } else {
      this.cashButton.classList.add("button_alt-active");
    }
  }

  set address(value: string) {
    this.addressInput.value = value;
  }

  setErrors(errors: Partial<TBuyerErrors>): void {
    const messages = [errors.payment, errors.address];
    this.errorsElement.textContent = messages.join(" ");
  }
}
