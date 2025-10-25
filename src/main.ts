import "./scss/styles.scss";
import { ProductCatalog } from "./components/Models/ProductCatalog";
import { Buyer } from "./components/Models/Buyer";
import { Cart } from "./components/Models/Cart";
import { DataExchanger } from "./components/base/Communication";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { IProduct } from "./types";
import { IOrder } from "./types";
import { TPayment } from "./types";

const api: Api = new Api(API_URL);

const buyer = new Buyer();
buyer.setData({
  email: "nobody@nowhere.com",
  phone: "777",
  address: "ул. Пушкина 7",
});

console.log(`Данные покупателя `, buyer.getData());
console.log(`Валидация данных покупателя `, buyer.validate());

const cart = new Cart();

const testProduct1: IProduct = {
  id: "n111",
  description: "Тестовое описание1",
  image: "1.png",
  title: "Тестовое название1",
  category: "Тестовая категория1",
  price: 450,
};

const testProduct2: IProduct = {
  id: "n222",
  description: "Тестовое описание2",
  image: "2.png",
  title: "Тестовое название2",
  category: "Тестовая категория2",
  price: 550,
};

cart.addItem(testProduct1);
cart.addItem(testProduct2);
console.log(`Количество товаров в корзине`, cart.getCount());
console.log(`Содержимое корзины `, cart.getItems());
console.log(`Общая стоимость товаров в корзине: `, cart.getTotalPrice());
console.log(`Товар с id = n111 присутствует в корзине: `, cart.hasItem("n111"));
console.log(`Товар с id = n333 присутствует в корзине: `, cart.hasItem("n333"));
cart.removeItem("n111");
console.log(
  `Товар с id = n111 присутствует в корзине после удаления: `,
  cart.hasItem("n111")
);
cart.clear();
console.log(`Корзина после чистки: `, cart.getItems());

const dataExchanger: DataExchanger = new DataExchanger(api);
const products: ProductCatalog = new ProductCatalog();
dataExchanger
  .getProducts()
  .then((catalogData) => {
    products.setProducts(catalogData.items);
    console.log(
      `Массив товаров из каталога после загрузки с сервера: `,
      products.getProducts()
    );

    products.setSelectedProduct(catalogData.items[1]);
    console.log(`Выбранный продукт: `, products.getSelectedProduct());
    console.log(
      `Продукт c id = ${catalogData.items[0].id}: `,
      products.getProductById(catalogData.items[0].id)
    );

    cart.addItem(products.getProducts()[0]);
    cart.addItem(products.getProducts()[1]);

    const order: IOrder = {
      payment: "online",
      email: buyer.getData().email,
      phone: buyer.getData().phone,
      address: buyer.getData().address,
      total: cart.getTotalPrice(),
      items: cart.getItems().map((item) => item.id),
    };

    dataExchanger
      .sendOrder(order)
      .then((data) =>
        console.log(`Ответ сервера после отправки данных заказа`, data)
      )
      .catch((error) => console.error("Ошибка при отправке заказа: ", error));
  })
  .catch((error) => {
    console.log("Ошибка при загрузке товаров:", error);
  });
