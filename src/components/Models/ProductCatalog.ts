import { IProduct } from "../../types";

export class ProductCatalog {
  private _products: IProduct[] = [];
  private _selectedProduct: IProduct | null = null;

  constructor() {}

  setProducts(products: IProduct[]): void {
    this._products = products;
  }

  getProducts(): IProduct[] {
    return this._products;
  }

  getProductById(id: string) {
    return this._products.find((product) => {
      product.id === id;
    });
  }

  setSelectedProduct(product: IProduct): IProduct | null {
    return (this._selectedProduct = product);
  }

  getSelectedProduct(): IProduct | null {
    return this._selectedProduct;
  }
}
