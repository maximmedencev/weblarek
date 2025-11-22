import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";
import { ISuccess } from "../../../types";
import { SYNAPSE_CURRENCY_NAME } from "../../../types";
import { EVENTS } from "../../../types";

export class Success extends Component<ISuccess> {
  protected closeElement: HTMLButtonElement;
  protected descriptionElement: HTMLElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);
    this.closeElement = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container
    );
    this.descriptionElement = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container
    );

    this.closeElement.addEventListener("click", () => {
      this.events.emit(EVENTS.success.close);
    });
  }

  set total(value: number) {
    this.descriptionElement.textContent = `Списано ${value} ${SYNAPSE_CURRENCY_NAME}`;
  }
}
