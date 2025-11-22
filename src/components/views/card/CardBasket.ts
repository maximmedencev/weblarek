import { Card } from "./Card";
import { IProduct, ICardBasketActions } from "../../../types";

export type TCardBasket = Pick<IProduct, "title" | "price">;

export class CardBasket extends Card<TCardBasket> {
  protected indexElement: HTMLElement | null = null;
  protected deleteButton: HTMLButtonElement | null = null;

  constructor(protected container: HTMLElement, actions?: ICardBasketActions) {
    super(container);

    this.indexElement = container.querySelector(".basket__item-index");
    this.deleteButton = container.querySelector(".basket__item-delete");

    if (actions?.onRemove) {
      this.deleteButton?.addEventListener("click", actions.onRemove);
    }
  }

  setIndex(index: number): void {
    if (this.indexElement) {
      this.indexElement.textContent = String(index);
    }
  }
}
