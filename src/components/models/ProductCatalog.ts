import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
import { EVENTS } from "../../types";

export class ProductCatalog {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  constructor(protected events: IEvents) {}

  setProducts(products: IProduct[]): void {
    this.products = products;
    this.events.emit(EVENTS.catalog.changed);
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getProductById(id: string) {
    return this.products.find((product) => product.id === id);
  }

  setSelectedProduct(product: IProduct) {
    this.selectedProduct = product;
    this.events.emit(EVENTS.catalog.select, product);
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
