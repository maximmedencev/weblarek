import { IEvents } from "../base/Events";
import { DataExchanger } from "../base/Communication";
import { Buyer } from "../models/Buyer";
import { Cart } from "../models/Cart";
import { ProductCatalog } from "../models/ProductCatalog";
import { Api } from "../base/Api";
import { ensureElement } from "../../utils/utils";
import { CDN_URL } from "../../utils/constants";
import { Header } from "../views/Header";
import { Modal } from "../views/modal/Modal";
import { CardPreview } from "../views/card/CardPreview";
import { OrderForm } from "../views/forms/OrderForm";
import { ContactsForm } from "../views/forms/ContactsForm";
import { Basket } from "../views/basket/Basket";
import { CardCatalog } from "../views/card/CardCatalog";
import { IProduct, TPayment } from "../../types";
import { cloneTemplate } from "../../utils/utils";
import { Gallery } from "../views/gallery/Gallery";
import { CardBasket } from "../views/card/CardBasket";
import { Success } from "../views/success/Success";
import { IBuyer } from "../../types";
import { EVENTS } from "../../types";

export class Presenter {
  private buyer: Buyer;
  private cart: Cart;
  private catalog: ProductCatalog;
  private dataExchanger: DataExchanger;
  private orderForm: OrderForm;
  private contactsForm: ContactsForm;
  private success: Success;

  constructor(
    private events: IEvents,
    private header: Header,
    private gallery: Gallery,
    private modal: Modal,
    private basket: Basket,
    private baseUrl: string
  ) {
    const api = new Api(this.baseUrl);
    this.dataExchanger = new DataExchanger(api);
    this.buyer = new Buyer(events);
    this.cart = new Cart(events);
    this.catalog = new ProductCatalog(events);

    const orderFormElement = ensureElement<HTMLTemplateElement>("#order");
    this.orderForm = new OrderForm(
      cloneTemplate(orderFormElement),
      this.events
    );

    const contactsFormElement = ensureElement<HTMLTemplateElement>("#contacts");
    this.contactsForm = new ContactsForm(
      cloneTemplate(contactsFormElement),
      this.events
    );

    const succesElement = ensureElement<HTMLTemplateElement>("#success");
    this.success = new Success(cloneTemplate(succesElement), this.events);

    this.loadCatalog();

    const cardCatalogTemplate =
      ensureElement<HTMLTemplateElement>("#card-catalog");

    this.events.on(EVENTS.catalog.changed, () => {
      const itemCards = this.catalog.getProducts().map((product) => {
        const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
          onClick: () => this.events.emit(EVENTS.card.select, product),
        });
        return card.render(product);
      });

      this.gallery.items = itemCards;
    });

    this.events.on<IProduct>(EVENTS.card.select, (product) => {
      this.openPreview(product);
    });

    this.events.on(EVENTS.basket.open, () => {
      this.openBasket();
    });
    ``;
    this.events.on<IProduct>(EVENTS.card.remove, (product) => {
      this.cart.removeItem(product.id);
    });

    this.events.on(EVENTS.cart.remove, () => this.openBasket());
    this.events.on(EVENTS.cart.clear, () => this.updateBasket());
    this.events.on(EVENTS.basket.checkout, () => {
      this.openOrderForm();
    });
    this.events.on(EVENTS.order.submit, () => {
      this.openContactsForm();
    });

    this.events.on<{ address: string }>(EVENTS.order.address, (data) => {
      this.buyer.setAddress(data.address);
    });

    this.events.on<{ payment: TPayment }>(EVENTS.order.payment, (data) => {
      this.buyer.setPayment(data.payment);
    });

    this.events.on<{ email: string }>(EVENTS.contacts.email, (data) => {
      this.buyer.setEmail(data.email);
    });

    this.events.on<{ phone: string }>(EVENTS.contacts.phone, (data) => {
      this.buyer.setPhone(data.phone);
    });

    this.events.on<{ payment: TPayment }>(
      EVENTS.buyer.paymentChanged,
      (data) => {
        this.orderForm.setPayment(data.payment);
        this.updateOrderFormValidity();
      }
    );

    this.events.on(EVENTS.buyer.addressChanged, () => {
      this.updateOrderFormValidity();
    });

    this.events.on(EVENTS.buyer.emailChanged, () => {
      this.updateContactsFormValidity();
    });

    this.events.on(EVENTS.buyer.phoneChanged, () => {
      this.updateContactsFormValidity();
    });

    this.events.on(EVENTS.contacts.submit, () => {
      const orderData: IBuyer = this.buyer.getData();
      const items = this.cart.getItems().map((item) => item.id);

      this.dataExchanger
        .sendOrder({
          ...orderData,
          items,
          total: this.cart.getTotalPrice(),
        })
        .then((result) => {
          console.log(result);
          this.openSuccess();
        })
        .catch((error) => {
          console.error("Ошибка отправки заказа:", error);
        });
    });
    this.events.on(EVENTS.success.close, () => {
      this.cart.clear();
      this.buyer.clear();
      modal.setVisible(false);
    });

    this.events.on(EVENTS.modal.close, () => {
      modal.setVisible(false);
    });
  }

  private async loadCatalog() {
    this.dataExchanger.getProducts().then((catalogData) => {
      catalogData.items.map((item) => (item.image = CDN_URL + item.image));
      this.catalog.setProducts(catalogData.items);
    });
  }

  private openPreview(product: IProduct) {
    const cardElement = cloneTemplate(
      ensureElement<HTMLTemplateElement>("#card-preview")
    );

    const card = new CardPreview(cardElement, {
      onChange: () => {
        const isInCart: boolean = this.cart.hasItem(product.id);
        if (isInCart) {
          this.cart.removeItem(product.id);
        } else {
          this.cart.addItem(product);
        }
        this.updateBasket();
        card.isInCart = !isInCart;
        this.modal.content = card.render();
      },
    });
    if (product.price === null) {
      card.setButtonDisabled(true);
    }

    card.isInCart = this.cart.hasItem(product.id);
    this.modal.content = card.render(product);

    this.modal.setVisible(true);
  }

  private openBasket() {
    const cardBasketTemplate =
      ensureElement<HTMLTemplateElement>("#card-basket");

    const basketCards = this.cart.getItems().map((product, index) => {
      const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
        onRemove: () => this.events.emit(EVENTS.card.remove, product),
      });
      card.setIndex(index + 1);
      return card.render(product);
    });
    this.basket.items = basketCards;

    this.updateBasket();
    if (this.cart.getCount() == 0) {
      this.basket.checkoutButtonDisabled = true;
    } else {
      this.basket.checkoutButtonDisabled = false;
    }

    this.modal.content = this.basket.render();

    this.modal.setVisible(true);
  }

  private updateBasket() {
    const total = this.cart.getTotalPrice();
    const count = this.cart.getCount();

    if (count > 0) {
      this.basket.setFulltBasketTitle();
    } else {
      this.basket.setEmptytBasketTitle();
    }

    this.header.counter = count;
    this.basket.total = total;
  }

  private openOrderForm() {
    const buyerData = this.buyer.getData();

    if (buyerData.payment || buyerData.address) {
      this.orderForm.setFormData({
        payment: buyerData.payment,
        address: buyerData.address,
      });
    }

    this.modal.content = this.orderForm.render();
    this.modal.setVisible(true);
  }

  private updateOrderFormValidity() {
    const errors = this.buyer.validate();
    const hasErrors = "address" in errors || "payment" in errors;

    this.orderForm.setErrors(errors);
    this.orderForm.submitButtonDisabled = hasErrors;
  }

  private openContactsForm() {
    const buyerData = this.buyer.getData();
    if (buyerData.email || buyerData.phone) {
      this.contactsForm.setFormData({
        email: buyerData.email,
        phone: buyerData.phone,
      });
    }

    this.modal.content = this.contactsForm.render();
    this.modal.setVisible(true);
  }

  private updateContactsFormValidity() {
    const errors = this.buyer.validate();
    const hasErrors = "email" in errors || "phone" in errors;

    this.contactsForm.setErrors(errors);
    this.contactsForm.submitButtonDisabled = hasErrors;
  }

  private openSuccess(): void {
    this.success.total = this.cart.getTotalPrice();

    this.modal.content = this.success.render();
    this.modal.setVisible(true);
  }
}
