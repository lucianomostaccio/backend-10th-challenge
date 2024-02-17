import { Router } from "express";
import { onlyLoggedInWeb } from "../../middlewares/authorization.js";
import { getDaoProducts } from "../../daos/products/products.dao.js";

export const webProductsRouter = Router();

webProductsRouter.get("/products", onlyLoggedInWeb, async (req, res) => {
  // Load products directly, or change it to use a database
  const daoProducts = getDaoProducts();
  const products = await daoProducts.readMany();
  console.log("User in session:", req.session["user"]);
  res.render("products.handlebars", {
    welcomeMessage: "Welcome",
    ...req.session["user"],
    pageTitle: "Products",
    products,
    style: "products.css",
  });
});
