import { Component } from "../../base/Component";
import { SYNAPSE_CURRENCY_NAME } from "../../../types";
const PRICELESS_COST_VALUE = "Бесценно";

export abstract class Card<T> extends Component<T> {
  protected titleElement: HTMLElement | null = null;
  protected priceElement: HTMLElement | null = null;

  constructor(protected container: HTMLElement) {
    super(container);

    this.titleElement = container.querySelector(".card__title");
    this.priceElement = container.querySelector(".card__price");
  }

  set title(value: string) {
    if (this.titleElement) {
      this.titleElement.textContent = value;
    }
  }
  set price(value: number | null) {
    if (this.priceElement) {
      if (value === null) {
        this.priceElement.textContent = PRICELESS_COST_VALUE;
      } else {
        this.priceElement.textContent = `${value} ${SYNAPSE_CURRENCY_NAME}`;
      }
    }
  }
}
