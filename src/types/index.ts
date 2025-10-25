export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods
  ): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export type TPayment = "online" | "cash";

export interface IBuyer {
  paymentType: TPayment;
  email: string;
  phone: string;
  address: string;
}

export interface ICatalogData {
  length: number;
  items: IProduct[];
}

export type TOrder = {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
};
