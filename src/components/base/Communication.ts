import { ICatalogData, IOrder, IApi, IOrderResponse } from "../../types";

export class DataExchanger {
  private _api: IApi;

  constructor(api: IApi) {
    this._api = api;
  }

  async getProducts(): Promise<ICatalogData> {
    return await this._api.get("/product/");
  }

  async sendOrder(orderData: IOrder): Promise<IOrderResponse> {
    return await this._api.post("/order/", orderData);
  }
}
