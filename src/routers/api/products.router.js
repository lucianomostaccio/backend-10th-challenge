import { Router } from "express";
import generateMockProducts from '../../utils/mockProducts.js';
import {
  getController,
  postController,
  deleteController,
  putController,
} from "../../controllers/products.controller.js";

export const productsRouter = Router();

productsRouter.get("/", getController);
productsRouter.post("/", postController);
productsRouter.put("/:pid", putController);
productsRouter.delete("/:pid", deleteController);

productsRouter.get('/mockingproducts', (req, res) => {
  const mockProducts = generateMockProducts();
  res.json(mockProducts);
});