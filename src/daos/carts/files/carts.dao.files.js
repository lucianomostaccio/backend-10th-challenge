import { promises } from "fs";
import { join } from "path";

const PATH_CARTS_FILES = "../../../db/carts.json";
const filePath = join(__dirname, PATH_CARTS_FILES);

export class CartManagerFiles {
  constructor() {
    this.path = filePath;
    this.carts = [];
    this.nextId = 1;
    this.loadCartsFromFile();
  }
  //cargar carts desde el json
  async loadCartsFromFile() {
    try {
      const data = await promises.readFile(this.path, "utf8");
      this.carts = JSON.parse(data);
      // console.log("carts leídos desde el json:", this.carts);
      const lastCart = this.carts[this.carts.length - 1];
      if (lastCart) {
        this.nextId = lastCart.id + 1;
      }
    } catch (err) {
      console.error("Error al cargar los carts desde el archivo:", err);
    }
  }
  //guardar todos los carts en el json
  async saveCartsToFile() {
    try {
      const data = JSON.stringify(this.carts, null, 2);
      await promises.writeFile(this.path, data, "utf8");
      console.log("Carts guardados en el archivo correctamente.");
    } catch (err) {
      console.error("Error al guardar los carts en el archivo:", err);
    }
  }
  //agregar cart
  async addCart(cartData) {
    const newCart = {
      id: this.nextId,
      products: [],
    };
    //requerimientos:
    // if (!products) {
    //   console.error(
    //     "Los campos son obligatorios: array de products."
    //   );
    //   return;
    // }
    this.carts.push(newCart); 
    this.nextId++; //autogenerar el id sumando 1
    await this.saveCartsToFile(); //ejecutar la función para escribir el nuevo cart en el json
    console.log("Cart agregado:", newCart);
  }

  //traer todos los carts 
    getCarts() {
      return this.carts;
    }

  //traer cart por id
  getCartById(id) {
    const cart = this.carts.find((cart) => cart.id === id);
    if (!cart) {
      console.error("Cart no encontrado");
    } else {
      return cart;
    }
  }

  //updatear cart obtenido con id en el paso anterior
  async addProductToCart(cartId, productId) {
    const cartToUpdate = this.getCartById(cartId);

    if (cartToUpdate) {
      const productIndex = cartToUpdate.products.findIndex(
        (product) => product.id === productId
      );
      if (productIndex !== -1) {
        // si el producto ya existe en el carrito, se incrementa la cantidad
        cartToUpdate.products[productIndex].quantity += 1;
      } else {
        // sl el producto no está en el carrito (es nuevo), se agrega con cantidad inicial=1
        cartToUpdate.products.push({
          id: productId,
          quantity: 1,
        });
      }
      await this.saveCartsToFile();
      console.log("Producto agregado al carrito:", this.getCartById(cartId));
    } else {
      console.error("Carrito no encontrado para agregar el producto");
    }
  }
}




// import { matches } from "../../utils.js";
// import fs from 'fs/promises';

// export class CartsDaoFiles {
//   constructor(path) {
//     this.path = path;
//   }

//   async #readCarts() {
//     try {
//       return JSON.parse(await fs.readFile(this.path, 'utf-8'));
//     } catch (error) {
//       console.error("Error reading carts from file:", error);
//       return [];
//     }
//   }

//   async #writeCarts(carts) {
//     try {
//       await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
//     } catch (error) {
//       console.error("Error writing carts to file:", error);
//     }
//   }

//   async create(cartPojo) {
//     const carts = await this.#readCarts();
//     carts.push(cartPojo);
//     await this.#writeCarts(carts);
//     return cartPojo;
//   }

//   async readOne(query) {
//     const carts = await this.#readCarts();
//     const searched = carts.find(matches(query));
//     return searched;
//     // return carts.find(cart => cart._id === query._id);
//   }

//   async readMany(query) {
//     const carts = await this.#readCarts();
//     const manySearched = carts.filter(matches(query));
//     return manySearched;
//   }

//   async updateOne(query, data) {
//     const carts = await this.#readCarts();
//     const index = carts.findIndex(matches(query));
//     if (index !== -1) {
//       carts[index] = { ...carts[index], ...data };
//       await this.#writeCarts(carts);
//       return carts[index];
//     }
//     throw new Error("Cart not found");
//   }

//   async updateMany(query, data) {
//     const carts = await this.#readCarts();
//     const updatedCarts = carts.map(cart => {
//       if (matches(query)(cart)) {
//         return { ...cart, ...data };
//       }
//       return cart;
//     });
//     await this.#writeCarts(updatedCarts);
//     return updatedCarts;
//   }


//   async deleteOne(query) {
//     const carts = await this.#readCarts();
//     const index = carts.findIndex(matches(query));
//     if (index !== -1) {
//       const deletedCart = carts.splice(index, 1)[0];
//       await this.#writeCarts(carts);
//       return deletedCart;
//     }
//     throw new Error("Cart not found");
//   }

//   async deleteMany(query) {
//     const carts = await this.#readCarts();
//     const remainingCarts = carts.filter(cart => !matches(query)(cart));
//     const deletedCarts = carts.filter(cart => matches(query)(cart));
//     await this.#writeCarts(remainingCarts);
//     return deletedCarts;
//   }
// }