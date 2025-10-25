import { IProduct } from "../../types";

export class Cart {
  private items: IProduct[] = [];

  constructor() {}

  getItems(): IProduct[] {
    return this.items;
  }

  addItem(product: IProduct): void {
    this.items.push(product);
  }

  removeItem(productId: string) {
    this.items = this.items.filter((item) => item.id !== productId);
  }

  clear(): void {
    this.items = [];
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
