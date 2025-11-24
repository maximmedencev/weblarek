import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
import { EVENTS } from "../../types";

export class Cart {
  private items: IProduct[] = [];

  constructor(protected events: IEvents) {}

  getItems(): IProduct[] {
    return this.items;
  }

  addItem(product: IProduct): void {
    if (!this.hasItem(product.id)) {
      this.items.push(product);
      this.events.emit(EVENTS.cart.changed);
    }
  }

  removeItem(productId: string) {
    this.items = this.items.filter((item) => item.id !== productId);
    this.events.emit(EVENTS.cart.changed, { productId: productId });
  }

  clear(): void {
    this.items = [];
    this.events.emit(EVENTS.cart.changed);
  }

  getTotalPrice(): number {
    return this.items.reduce((acc, cur) => {
      return acc + (cur.price ?? 0);
    }, 0);
  }

  getCount(): number {
    return this.items.length;
  }

  hasItem(productId: string): boolean {
    return this.items.some((item) => item.id === productId);
  }
}
