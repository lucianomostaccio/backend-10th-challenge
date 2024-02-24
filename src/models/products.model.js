import { randomUUID } from "node:crypto";

export class Product {
  #_id;
  #title;
  #price;
  constructor({ _id = randomUUID(), title, price }) {
    this.#_id = _id;
    this.title = title;
    this.price = price;
  }

  get _id() {
    return this.#_id;
  }
  get title() {
    return this.#title;
  }
  get price() {
    return this.#price;
  }

  set title(value) {
    if (!value) throw new Error("title is mandatory");
    this.#title = value;
  }

  set price(value) {
    if (!value) throw new Error("price is mandatory");
    if (value <= 0) throw new Error("price must greater than 0");
    this.#price = value;
  }

  toPOJO() {
    return {
      _id: this.#_id,
      title: this.#title,
      price: this.#price,
    };
  }
}
