import "./scss/styles.scss";
import { ensureElement } from "./utils/utils";
import { EventEmitter } from "./components/base/Events";
import { Presenter } from "./components/presenter/Presenter";
import { Header } from "./components/views/Header";
import { Modal } from "./components/views/modal/Modal";
import { Basket } from "./components/views/basket/Basket";
import { API_URL } from "./utils/constants";
import { cloneTemplate } from "./utils/utils";
import { Gallery } from "./components/views/gallery/Gallery";

const headerElement = ensureElement<HTMLElement>(".header");
const modalElement = ensureElement<HTMLElement>("#modal-container");
const basketElement = ensureElement<HTMLTemplateElement>("#basket");
const galleryElement = ensureElement<HTMLElement>("main");

const events = new EventEmitter();
const header = new Header(headerElement, events);
const modal = new Modal(modalElement, events);
const basket = new Basket(cloneTemplate(basketElement), events);
const gallery = new Gallery(galleryElement);

const presenter = new Presenter(
  events,
  header,
  gallery,
  modal,
  basket,
  API_URL
);
