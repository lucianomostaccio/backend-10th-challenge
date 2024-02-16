// const CartModel = require("../../models/cartModel.js");

// class CartManager {
//   // Cargar carts desde la base de datos
//   async loadCartsFromDatabase() {
//     try {
//       this.carts = await CartModel.find();
//       const lastCart = this.carts[this.carts.length - 1];
//       if (lastCart) {
//         this.nextId = lastCart.id + 1;
//       }
//     } catch (err) {
//       console.error("Error al cargar los carts desde la base de datos:", err);
//     }
//   }

//   // Guardar todos los carts en la base de datos
//   async saveCartsToDatabase() {
//     try {
//       await CartModel.insertMany(this.carts);
//       console.log("Carts guardados en la base de datos correctamente.");
//     } catch (err) {
//       console.error("Error al guardar los carts en la base de datos:", err);
//     }
//   }

//   // Agregar cart a la base de datos
//   async addCart(cartData) {
//     const newCart = new CartModel({
//       products: [],
//     });

//     try {
//       await newCart.save();
//       console.log("Cart agregado:", newCart);
//     } catch (err) {
//       console.error("Error al agregar el cart en la base de datos:", err);
//     }
//   }

//   // Obtener todos los carts
//   async getCarts() {
//     try {
//       return await CartModel.find();
//     } catch (err) {
//       console.error("Error al obtener los carts desde la base de datos:", err);
//       return [];
//     }
//   }

//   // Obtener cart por ID
//   async getCartById(_id) {
//     try {
//       return await CartModel.findById(_id);
//     } catch (err) {
//       console.error("Error al obtener el cart desde la base de datos:", err);
//       return null;
//     }
//   }

//   // Agregar producto a un cart específico
//   async addProductToCart(cartId, productId) {
//     try {
//       const cartToUpdate = await CartModel.findById(cartId);

//       if (cartToUpdate) {
//         const productIndex = cartToUpdate.products.findIndex(
//           (product) => product._id === productId
//         );

//         if (productIndex !== -1) {
//           // Si el producto ya existe en el carrito, se incrementa la cantidad
//           cartToUpdate.products[productIndex].quantity += 1;
//         } else {
//           // Si el producto no está en el carrito (es nuevo), se agrega con cantidad inicial=1
//           cartToUpdate.products.push({
//             _id: productId,
//             quantity: 1,
//           });
//         }

//         await cartToUpdate.save(); // Actualizar el cart en la base de datos con los cambios
//         console.log("Producto agregado al carrito:", cartToUpdate);
//       } else {
//         console.error("Carrito no encontrado para agregar el producto");
//       }
//     } catch (error) {
//       console.error("Error al agregar el producto al carrito:", error);
//     }
//   }
// }

// module.exports = CartManager;
