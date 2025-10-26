import "./scss/styles.scss";
import { ProductCatalog } from "./components/Models/ProductCatalog";
import { Buyer } from "./components/Models/Buyer";
import { Cart } from "./components/Models/Cart";
import { DataExchanger } from "./components/base/Communication";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { apiProducts } from "./utils/data";
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

cart.addItem(apiProducts.items[0]);
cart.addItem(apiProducts.items[1]);
console.log(`Количество товаров в корзине`, cart.getCount());
console.log(`Содержимое корзины `, cart.getItems());
console.log(`Общая стоимость товаров в корзине: `, cart.getTotalPrice());
console.log(
  `Товар с id = ${apiProducts.items[0].id} присутствует в корзине: `,
  cart.hasItem(apiProducts.items[0].id)
);
console.log(
  `Товар с id = fakeId111 присутствует в корзине: `,
  cart.hasItem("fakeId111")
);
cart.removeItem(apiProducts.items[0].id);
console.log(
  `Товар с id = ${apiProducts.items[0].id} присутствует в корзине после удаления: `,
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
  })
  .catch((error) => {
    console.log("Ошибка при загрузке товаров:", error);
  });
