// @ts-nocheck
import { Router } from "express";
import { onlyLoggedInWeb } from "../../middlewares/authorization.js";
import { getDaoUsers } from "../../daos/users/users.dao.js";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../../config/config.js";
export const webUsersRouter = Router();

webUsersRouter.get("/register", (req, res) => {
  if (!req.session["user"]) {
    // Only show the registration view if the user is not logged in
    res.render("register.handlebars", {
      pageTitle: "Register",
      style: "register.css",
    });
  } else {
    res.redirect("/products"); // Redirect the user to the products view if already logged in
  }
});

webUsersRouter.get("/profile", onlyLoggedInWeb, async (req, res) => {
  try {
    const usersDao = getDaoUsers();
    console.log("Session user object:", req.session["user"]); // Log the session user object

    const updatedUser = await usersDao
      .readOne({ email: req.session["user"].email }, { password: 0 })
      // .lean(); not needed as we are passing a plain object
    console.log("Updated user object from database:", updatedUser); // Log the updated user object from DB

    updatedUser.role =
      updatedUser.email === ADMIN_EMAIL &&
      updatedUser.password === ADMIN_PASSWORD
        ? "admin"
        : "user";
    console.log("User role:", updatedUser.role); // Log the determined user role

    const normalizedImagePath = updatedUser.profile_picture.replace(/\\/g, "/");
    console.log("Normalized image path:", normalizedImagePath); // Log the normalized image path

    updatedUser.fullImageUrl = `http://localhost:8080/${normalizedImagePath.replace(
      "src/static/",
      ""
    )}`;
    console.log("Full image URL:", updatedUser.fullImageUrl); // Log the full image URL

    req.session["user"] = updatedUser; // Update the session data with the latest user information
    console.log("Session updated with new user data"); // Log session update

    res.render("profile.handlebars", {
      pageTitle: "Profile",
      ...updatedUser,
      style: "profile.css",
    });
  } catch (error) {
    console.error("Error fetching updated user data:", error); // Log any errors
    res.status(500).render("error.handlebars", { pageTitle: "Error" });
  }
});

webUsersRouter.get("/edit", onlyLoggedInWeb, (req, res) => {
  res.render("profileEdit.handlebars", {
    pageTitle: "Edit your profile",
    ...req.session["user"],
    style: "profile.css",
  });
});

webUsersRouter.get("/resetpass", (req, res) => {
  if (!req.session["user"]) {
    res.render("resetpass.handlebars", {
      pageTitle: "Reset Password",
      style: "resetpass.css",
    }); // Only show the reset password view if the user is not logged in
  } else {
    res.redirect("/products"); // Redirect the user to the products view if already logged in
  }
});
