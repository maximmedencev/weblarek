import { Form } from "./Form";
import { IBuyer } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { TBuyerErrors } from "../../models/Buyer";
import { EVENTS } from "../../../types";
export type TContactsFormData = Pick<IBuyer, "email" | "phone">;

export type TContactsFormErrors = Partial<
  Record<keyof TContactsFormData, string>
>;

export class ContactsForm extends Form<TContactsFormData> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container, events);

    this.emailInput = ensureElement<HTMLInputElement>(
      '.form__input[name="email"]',
      container
    );
    this.phoneInput = ensureElement<HTMLInputElement>(
      '.form__input[name="phone"]',
      container
    );

    this.emailInput.addEventListener("input", () =>
      this.events.emit(EVENTS.contacts.email, {
        email: this.emailInput.value,
      })
    );
    this.phoneInput.addEventListener("input", () =>
      this.events.emit(EVENTS.contacts.phone, {
        phone: this.phoneInput.value,
      })
    );

    this.container.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      this.events.emit(EVENTS.contacts.submit);
    });
  }
  set email(value: string) {
    this.emailInput.value = value;
  }
  set phone(value: string) {
    this.phoneInput.value = value;
  }

  setErrors(errors: Partial<TBuyerErrors>): void {
    const messages = [errors.email, errors.phone];
    this.errorsElement.textContent = messages.join(" ");
  }
}
