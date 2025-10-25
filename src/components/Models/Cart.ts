import { IProduct } from "../../types";

export class Cart {
  private _items: IProduct[] = [];

  constructor() {}

  getItems(): IProduct[] {
    return this._items;
  }

  addItem(product: IProduct): void {
    this._items.push(product);
  }

  removeItem(productId: string) {
    this._items = this._items.filter((item) => {
      item.id !== productId;
    });
  }

  clear(): void {
    this._items = [];
  }

  getTotalPrice(): number {
    return this._items.reduce((acc, cur) => {
      return acc + (cur.price ?? 0);
    }, 0);
  }

  getCount(): number {
    return this._items.length;
  }

  hasItem(productId: string): boolean {
    return this._items.some((item) => {
      item.id === productId;
    });
  }
}
