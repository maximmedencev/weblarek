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

export type TPayment = "online" | "cash" | null;

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export interface ICatalogData {
  total: number;
  items: IProduct[];
}

export interface IOrder extends IBuyer {
  total: number;
  items: string[];
}

export interface IOrderResponse {
  id: string;
  total: number;
}

export interface IHeader {
  counter: number;
}

export interface ICardActions {
  onClick?: () => void;
}

export interface ICardPreviewActions {
  onChange?: () => void;
}

export interface ICardBasketActions {
  onRemove?: () => void;
}

export interface IOrderFormActions {
  onSubmit?: () => void;
}

export interface IBasketData {
  items: HTMLElement[];
  total: number;
}

export interface IGallery {
  items: HTMLElement[];
}

export interface ISuccess {
  total: number;
}

export const SYNAPSE_CURRENCY_NAME = "синапсов";

export const EVENTS = {
  catalog: {
    changed: "catalog:changed",
    select: "catalog:select",
  },

  card: {
    remove: "card:remove",
  },

  basket: {
    open: "basket:open",
    checkout: "basket:checkout",
  },

  cart: {
    changed: "cart:changed",
    clear: "cart:clear",
  },

  order: {
    submit: "order:submit",
    address: "order:address",
    payment: "order:payment",
  },

  contacts: {
    submit: "contacts:submit",
    email: "contacts:email",
    phone: "contacts:phone",
  },

  buyer: {
    paymentChanged: "buyer:payment-changed",
    addressChanged: "buyer:address-changed",
    emailChanged: "buyer:email-changed",
    phoneChanged: "buyer:phone-changed",
    dataChanged: "buyer:data-changed",
    clear: "buyer:clear",
  },

  success: {
    close: "success:close",
  },

  modal: {
    close: "modal:close",
  },
} as const;
