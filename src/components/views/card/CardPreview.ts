import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { ICardPreviewActions } from "../../../types";
import { Card } from "./Card";
import { categoryMap } from "../../../utils/constants";

export type TCardPreview = Pick<
  IProduct,
  "image" | "category" | "title" | "description" | "price"
>;

const ENABLED_BUY_BUTTON_CAPTION = "Купить";
const DISABLED_BUY_BUTTON_CAPTION = "Недоступно";
const CLICKED_BUY_BUTTON_CAPTION = "Удалить из корзины";

export class CardPreview extends Card<TCardPreview> {
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;

  constructor(protected container: HTMLElement, actions?: ICardPreviewActions) {
    super(container);

    this.descriptionElement = ensureElement<HTMLElement>(
      ".card__text",
      this.container
    );
    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container
    );
    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container
    );
    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container
    );

    if (actions?.onChange) {
      this.buttonElement.addEventListener("click", actions.onChange);
    }
    this.buttonElement.textContent = ENABLED_BUY_BUTTON_CAPTION;
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set isInCart(value: boolean) {
    this.buttonElement.textContent = value
      ? CLICKED_BUY_BUTTON_CAPTION
      : ENABLED_BUY_BUTTON_CAPTION;
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    for (const [key, className] of Object.entries(categoryMap) as [
      keyof typeof categoryMap,
      string
    ][]) {
      this.categoryElement.classList.toggle(className, key === value);
    }
  }

  set image(value: string) {
    this.imageElement.src = value;
  }

  setButtonDisabled(value: boolean): void {
    this.buttonElement.disabled = value;
    if (value) {
      this.buttonElement.textContent = DISABLED_BUY_BUTTON_CAPTION;
    } else {
      this.buttonElement.textContent = ENABLED_BUY_BUTTON_CAPTION;
    }
  }
}
