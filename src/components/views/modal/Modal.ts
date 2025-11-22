import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { EVENTS } from "../../../types";

export class Modal {
  protected closeButton: HTMLButtonElement;
  protected contentElement: HTMLElement;
  protected container: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    this.container = container;
    this.closeButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      container
    );
    this.contentElement = ensureElement<HTMLElement>(
      ".modal__content",
      container
    );

    this.closeButton.addEventListener("click", () =>
      this.events.emit(EVENTS.modal.close)
    );
    this.container.addEventListener("click", (event) => {
      if (event.target === this.container) {
        this.events.emit(EVENTS.modal.close);
      }
    });
  }

  setVisible(state: boolean) {
    this.container.classList.toggle("modal_active", state);
  }

  set content(content: HTMLElement) {
    this.contentElement.replaceChildren(content);
  }
}
