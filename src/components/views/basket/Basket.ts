import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { IBasketData } from "../../../types";
import { SYNAPSE_CURRENCY_NAME } from "../../../types";
import { EVENTS } from "../../../types";

const FILLED_BASKET_TITLE = "Корзина";
const EMPTY_BASKET_TITLE = "Корзина пуста";

export class Basket extends Component<IBasketData> {
  protected listElement: HTMLElement;
  protected totalElement: HTMLElement;
  protected checkoutButton: HTMLButtonElement;
  protected titleElement: HTMLElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    this.titleElement = ensureElement<HTMLElement>(".modal__title", container);
    this.listElement = ensureElement<HTMLElement>(".basket__list", container);
    this.totalElement = ensureElement<HTMLElement>(".basket__price", container);
    this.checkoutButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      container
    );

    this.checkoutButton.disabled = true;

    this.checkoutButton.addEventListener("click", () => {
      this.events.emit(EVENTS.basket.checkout);
    });
  }

  set items(value: HTMLElement[]) {
    this.listElement.replaceChildren(...value);
  }

  set total(value: number) {
    this.totalElement.textContent = `${value} ${SYNAPSE_CURRENCY_NAME}`;
  }

  set checkoutButtonDisabled(state: boolean) {
    this.checkoutButton.disabled = state;
  }

  setFulltBasketTitle(): void {
    this.titleElement.textContent = FILLED_BASKET_TITLE;
  }

  setEmptytBasketTitle(): void {
    this.titleElement.textContent = EMPTY_BASKET_TITLE;
  }
}
