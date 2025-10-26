import { ICatalogData, IOrder, IApi, IOrderResponse } from "../../types";

export class DataExchanger {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  async getProducts(): Promise<ICatalogData> {
    return await this.api.get("/product/");
  }

  async sendOrder(orderData: IOrder): Promise<IOrderResponse> {
    return await this.api.post("/order/", orderData);
  }
}
