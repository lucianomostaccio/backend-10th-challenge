// @ts-nocheck
import { cartSchema } from "./carts.model.mongoose.js";
const CartModel = cartSchema;

export class CartManagerMongoose {
  // Cargar carts desde la base de datos
  async loadCartsFromDatabase() {
    try {
      this.carts = await CartModel.find();
      const lastCart = this.carts[this.carts.length - 1];
      if (lastCart) {
        this.nextId = lastCart.id + 1;
      }
    } catch (err) {
      console.error("Error al cargar los carts desde la base de datos:", err);
    }
  }

  // Guardar todos los carts en la base de datos
  async saveCartsToDatabase() {
    try {
      await CartModel.insertMany(this.carts);
      console.log("Carts guardados en la base de datos correctamente.");
    } catch (err) {
      console.error("Error al guardar los carts en la base de datos:", err);
    }
  }

  // Agregar cart a la base de datos
  async addCart(cartData) {
    const newCart = new CartModel({
      products: [],
    });

    try {
      await newCart.save();
      console.log("Cart agregado:", newCart);
    } catch (err) {
      console.error("Error al agregar el cart en la base de datos:", err);
    }
  }

  // Obtener todos los carts
  async getCarts() {
    try {
      return await CartModel.find();
    } catch (err) {
      console.error("Error al obtener los carts desde la base de datos:", err);
      return [];
    }
  }

  // Obtener cart por ID
  async getCartById(_id) {
    try {
      return await CartModel.findById(_id);
    } catch (err) {
      console.error("Error al obtener el cart desde la base de datos:", err);
      return null;
    }
  }

  // Agregar producto a un cart específico
  async addProductToCart(cartId, productId) {
    try {
      const cartToUpdate = await CartModel.findById(cartId);

      if (cartToUpdate) {
        const productIndex = cartToUpdate.products.findIndex(
          (product) => product._id === productId
        );

        if (productIndex !== -1) {
          // Si el producto ya existe en el carrito, se incrementa la cantidad
          cartToUpdate.products[productIndex].quantity += 1;
        } else {
          // Si el producto no está en el carrito (es nuevo), se agrega con cantidad inicial=1
          cartToUpdate.products.push({
            _id: productId,
            quantity: 1,
          });
        }

        await cartToUpdate.save(); // Actualizar el cart en la base de datos con los cambios
        console.log("Producto agregado al carrito:", cartToUpdate);
      } else {
        console.error("Carrito no encontrado para agregar el producto");
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  }
}



// import { toPOJO } from "../../utils.js";

// export class CartsDaoMongoose {
//   constructor(cartsModel) {
//     this.cartsModel = cartsModel;
//   }

//   async create(data) {
//     const cart = await this.cartsModel.create(data);
//     return toPOJO(cart);
//   }

//   async readOne(query) {
//     return await cartsModel.readOne(query).lean();
//     return toPOJO(cart);
//   }

//   async readMany(query) {
//     return toPOJO(await this.cartsModel.find(query).lean());
//   }

//   async updateOne(query, data) {
//     const updatedCart = await this.cartsModel.updateOne(query, data, { new: true }).lean();
//     if (!updatedCart) {
//       throw new Error("Cart not found");
//     }
//     return toPOJO(updatedCart);
//   }

//   async updateMany(query, data) {
//     const updatedCarts = await this.cartsModel.updateMany(query, data, { new: true }).lean();
//     if (!updatedCarts) {
//       throw new Error("No carts found to update");
//     }
//     return updatedCarts;
//   }

//   async deleteOne(query) {
//     const deletedCart = await this.cartsModel.deleteOne(query).lean();
//     if (!deletedCart) {
//       throw new Error("Cart not found");
//     }
//     return toPOJO(deletedCart);
//   }

//   async deleteMany(query) {
//     const deletedCarts = await this.cartsModel.deleteMany(query).lean();
//     if (!deletedCarts) {
//       throw new Error("No carts found to delete");
//     }
//     return deletedCarts;
//   }
// }

//   let cartsDaoMongoose;
//   console.log("using mongodb persistence - carts");

//   export async function getDaoMongoose() {
//     if (!cartsDaoMongoose) {
//       await connect(MONGODB_CNX_STR);
//       console.log("connected to mongodb");
//       cartsDaoMongoose = new CartsDaoMongoose();
//     }
//     return cartsDaoMongoose;
//   }
