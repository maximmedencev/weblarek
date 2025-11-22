import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";

export abstract class Form<T> extends Component<T> {
  protected submitButton: HTMLButtonElement;
  protected errorsElement: HTMLElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this.submitButton = ensureElement<HTMLButtonElement>(
      '.modal__actions button[type="submit"]',
      container
    );
    this.errorsElement = ensureElement<HTMLElement>(".form__errors", container);

    this.container.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      this.events.emit(`${this.container.getAttribute("name")}:submit`);
    });
  }

  set submitButtonDisabled(state: boolean) {
    this.submitButton.disabled = state;
  }
}
