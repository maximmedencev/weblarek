import { ICatalogData, IOrder, IApi } from "../../types";

export class DataExchanger {
  private _api: IApi;

  constructor(api: IApi) {
    this._api = api;
  }

  async getProducts(): Promise<ICatalogData> {
    const response: ICatalogData = await this._api.get("/product/");
    return response;
  }

  async sendOrder(orderData: IOrder): Promise<object> {
    return await this._api.post("/order/", orderData);
  }
}
