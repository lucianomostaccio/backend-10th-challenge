import fs from "fs/promises";
import { matches } from "../../utils.js";

export class ProductsDaoFiles {
  constructor(path) {
    this.path = path;
  }

  async #readProducts() {
    return JSON.parse(await fs.readFile(this.path, "utf-8"));
  }

  async #writeProducts(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
  }

  async create(newProduct) {
    const products = await this.#readProducts();
    products.push(newProduct);
    await this.#writeProducts(products);
    console.log("Product created successfully:", newProduct); // Added logging
    return newProduct;
  }

  async readOne(query) {
    const products = await this.#readProducts();
    const searched = products.find(matches(query));
    return searched;
  }

  async readMany(query) {
    const products = await this.#readProducts();
    const manySearched = products.filter(matches(query));
    return manySearched;
  }

  async updateOne(query, data) {
    const products = await this.#readProducts();
    const index = products.findIndex(matches(query));
    if (index !== -1) {
      products[index] = { ...products[index], ...data };
      await this.#writeProducts(products);
      return products[index];
    }
    throw new Error("Product not found");
  }

  async updateMany(query, data) {
    const products = await this.#readProducts();
    const updatedProducts = products.map((product) => {
      if (matches(query)(product)) {
        return { ...product, ...data };
      }
      return product;
    });
    await this.#writeProducts(updatedProducts);
    return updatedProducts;
  }

  async deleteOne(query) {
    const products = await this.#readProducts();
    const index = products.findIndex(matches(query));
    if (index !== -1) {
      const deletedProduct = products.splice(index, 1)[0];
      await this.#writeProducts(products);
      return deletedProduct;
    }
    throw new Error("Product not found");
  }

  async deleteMany(query) {
    const products = await this.#readProducts();
    const remainingProducts = products.filter(
      (product) => !matches(query)(product)
    );
    const deletedProducts = products.filter((product) =>
      matches(query)(product)
    );
    await this.#writeProducts(remainingProducts);
    return deletedProducts;
  }
}




// import { promises } from "fs";

// import { join } from "path";

// const PATH_PRODUCTS_FILES = "../../../db/products.json";
// const filePath = join(__dirname, PATH_PRODUCTS_FILES);

// export class ProductManagerFiles {
//   constructor() {
//     this.path = filePath;
//     this.loadProductsFromFile();
//     this.products = [];
//     this.nextId = 1;
//   }
//   //cargar productos desde el json
//   async loadProductsFromFile() {
//     try {
//       const data = await promises.readFile(this.path, "utf8");
//       this.products = JSON.parse(data);
//       // console.log("Productos leídos desde el json:", this.products);
//       const lastProduct = this.products[this.products.length - 1];
//       if (lastProduct) {
//         this.nextId = lastProduct.id + 1;
//       }
//     } catch (err) {
//       console.error("Error al cargar los productos desde el archivo:", err);
//     }
//   }
//   //guardar todos los productos en el json
//   async saveProductsToFile() {
//     try {
//       const data = JSON.stringify(this.products, null, 2);
//       await promises.writeFile(this.path, data, "utf8");
//       console.log("Productos guardados en el archivo correctamente.");
//     } catch (err) {
//       console.error("Error al guardar los productos en el archivo:", err);
//     }
//   }

//   //traer los productos
//   getProducts() {
//     return this.products;
//   }

//   //agregar producto
//   async addProduct(productData) {
//     const {
//       title,
//       description,
//       code,
//       price,
//       status = true,
//       stock,
//       category,
//       thumbnails,
//     } = productData;

//     if (!title && !description && !code && !price && !stock && !category) {
//       console.error("Al menos un campo es obligatorio: title, description, code, price, stock, o category.");
//       return;
//     }

//     //setear nuevo producto
//     const newProduct = {
//       id: this.nextId,
//       title,
//       description,
//       code,
//       price,
//       status,
//       stock,
//       category,
//       thumbnails,
//     };

//     this.products.push(newProduct); //pushearlo
//     console.log("se acaba de agregar el producto en el array:", newProduct);
//     this.nextId++; //autogenerar el id sumando 1
//     await this.saveProductsToFile(); //ejecutar la función para escribir el nuevo producto en el json
//   }

//   //traer producto por id
//   getProductById(id) {
//     const product = this.products.find((product) => product.id === id);
//     if (!product) {
//       console.error("Producto no encontrado");
//     } else {
//       return product;
//     }
//   }

//   //updatear producto obtenido con id en el paso anterior
//   async updateProduct(id, updatedProduct) {
//     const productToUpdate = this.getProductById(id);

//     if (productToUpdate) {
//       // se actualiza el producto utilizando el spread operator
//       this.products = this.products.map((product) =>
//         product.id === id ? { ...product, ...updatedProduct } : product
//       );
//       await this.saveProductsToFile();
//       console.log("Producto actualizado:", this.getProductById(id));
//     } else {
//       console.error("Producto no encontrado para actualizar");
//     }
//   }

//   //borrar producto por id
//   async deleteProduct(id) {
//     const productToDelete = this.getProductById(id);
//     console.log("producto a eliminar encontrado por id:", productToDelete);
//     if (productToDelete) {
//       // Utilizamos filter para crear un nuevo array sin el producto a eliminar
//       this.products = this.products.filter((product) => product.id !== id);
//       await this.saveProductsToFile();
//       console.log("Producto eliminado");
//     } else {
//       console.error("Producto no encontrado para eliminar");
//     }
//   }
// }



// // import fs from "fs/promises";
// // import { matches } from "../../utils.js";

// // export class ProductsDaoFiles {
// //   constructor(path) {
// //     this.path = path;
// //   }

// //   async #readProducts() {
// //     return JSON.parse(await fs.readFile(this.path, "utf-8"));
// //   }

// //   async #writeProducts(products) {
// //     await fs.writeFile(this.path, JSON.stringify(products, null, 2));
// //   }

// //   async create(productPojo) {
// //     const products = await this.#readProducts();
// //     products.push(productPojo);
// //     await this.#writeProducts(products);
// //     return productPojo;
// //   }

// //   async readOne(query) {
// //     const products = await this.#readProducts();
// //     const searched = products.find(matches(query));
// //     return searched;
// //   }

// //   async readMany(query) {
// //     const products = await this.#readProducts();
// //     const manySearched = products.filter(matches(query));
// //     return manySearched;
// //   }

// //   async updateOne(query, data) {
// //     const products = await this.#readProducts();
// //     const index = products.findIndex(matches(query));
// //     if (index !== -1) {
// //       products[index] = { ...products[index], ...data };
// //       await this.#writeProducts(products);
// //       return products[index];
// //     }
// //     throw new Error("Product not found");
// //   }

// //   async updateMany(query, data) {
// //     const products = await this.#readProducts();
// //     const updatedProducts = products.map((product) => {
// //       if (matches(query)(product)) {
// //         return { ...product, ...data };
// //       }
// //       return product;
// //     });
// //     await this.#writeProducts(updatedProducts);
// //     return updatedProducts;
// //   }

// //   async deleteOne(query) {
// //     const products = await this.#readProducts();
// //     const index = products.findIndex(matches(query));
// //     if (index !== -1) {
// //       const deletedProduct = products.splice(index, 1)[0];
// //       await this.#writeProducts(products);
// //       return deletedProduct;
// //     }
// //     throw new Error("Product not found");
// //   }

// //   async deleteMany(query) {
// //     const products = await this.#readProducts();
// //     const remainingProducts = products.filter(
// //       (product) => !matches(query)(product)
// //     );
// //     const deletedProducts = products.filter((product) =>
// //       matches(query)(product)
// //     );
// //     await this.#writeProducts(remainingProducts);
// //     return deletedProducts;
// //   }
// // }
