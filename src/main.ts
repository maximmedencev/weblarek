import "./scss/styles.scss";
import { ProductCatalog } from "./components/Models/ProductCatalog";
import { Buyer } from "./components/Models/Buyer";
import { Cart } from "./components/Models/Cart";
import { DataExchanger } from "./components/base/Communication";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";

const api: Api = new Api(API_URL);

const dataExchanger: DataExchanger = new DataExchanger(api);
const catalogData = await dataExchanger.getProducts();
const products: ProductCatalog = new ProductCatalog();
products.setProducts(catalogData.items);

console.log(`Массив товаров из каталога: `, products.getProducts());
products.setSelectedProduct(products.getProducts()[0]);
console.log(`Выбранный продукт: `, products.getSelectedProduct());

const buyer = new Buyer();

buyer.setData({
  email: "nobody@nowhere.com",
  phone: "777",
  address: "ул. Пушкина 7",
});

console.log(`Данные покупателя `, buyer.getData());
console.log(`Валидация данных покупателя `, buyer.validate());

const cart = new Cart();

cart.addItem(products.getProducts()[0]);
cart.addItem(products.getProducts()[1]);
console.log(`Содержимое корзины `, cart.getItems());
