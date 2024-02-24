//register
// Import necessary modules
import { Router } from "express";
import {
  getController,
  postController,
  deleteController,
  putController,
} from "../../controllers/users.controller.js";
import { getDaoUsers } from "../../daos/users/users.dao.js";
import { createHash } from "../../utils/hashing.js";
import { onlyLoggedInRest } from "../../middlewares/authorization.js";
import { extractFile } from "../../middlewares/multer.js";

// Create the router
export const usersRouter = Router();

// Handle user registration (POST /api/users/)
usersRouter.post("/", extractFile("profile_picture"), async (req, res) => {
  //put exact name assigned in form to picture field
  try {
    // Hash the password
    req.body.password = createHash(req.body.password);
    console.log(req.body.password);

    // console.log(req.file);

    // Set the profile picture path based on the uploaded file
    if (req.file) {
      req.body.profile_picture = req.file.path;
    }

    // Use the postController to handle user creation
    await postController(req, res);
  } catch (error) {
    // Handle errors
    res.status(400).json({ status: "error", message: error.message });
  }
});

// Retrieve current user
// usersRouter.get("/current", onlyLoggedInRest, async (req, res) => {
//   try {
//     // @ts-ignore
//     const user = await getController({ email: req["user"].email }, { password: 0 });
//     // Leverage the getController.
//     // const userEmail = req.user.email;
//     console.log("req user is:", user);
//     res.status(200).json({ status: 'success', payload:user })
//   } catch (error) {
//     res.status(400).json({ status: "error", message: error.message });
//   }
// });
usersRouter.get("/current", onlyLoggedInRest, getController);

//   // @ts-ignore
//   const usuario = await getDaoUsers
//     // @ts-ignore
//     .findOne({ email: req["user"].email }, { password: 0 })
//     .lean();
//   res.json({ status: "success", payload: usuario });
// });

// Update user password (PUT /api/users/resetpass)
usersRouter.put("/resetpass", async function (req, res) {
  try {
    // Hash the new password
    req.body.password = createHash(req.body.password);

    // Update user password
    // const updatedUser = await getDaoUsers.updateOne(
    //   { email: req.body.email },
    //   { $set: { password: req.body.password } },
    //   { new: true }
    // );

    // Adapt putController to handle password change specifically
    const updatedUser = await putController(req, res);
    // Handle case where user does not exist
    // if (!updatedUser) {
    //   return res
    //     .status(404)
    //     .json({ status: "error", message: "user not found" });
    // }

    // Successful response
    res.json({
      status: "success",
      payload: updatedUser,
      message: "password updated",
    });
  } catch (error) {
    // Handle errors
    res.status(400).json({ status: "error", message: error.message });
  }
});

// Update user profile information (PUT /api/users/edit)
usersRouter.put(
  "/edit",
  extractFile("profile_picture"),
  async function (req, res) {
    try {
      // Update user information
      const updateFields = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
      };

      if (req.file) {
        updateFields.profile_picture = req.file.path;
      }

      // @ts-ignore
      const updatedUser = await getDaoUsers.updateOne(
        { email: req.body.email },
        { $set: updateFields },
        { new: true }
      );

      console.log(req.body.profile_picture);

      // Handle case where user does not exist
      if (!updatedUser) {
        return res
          .status(404)
          .json({ status: "error", message: "user not found" });
      }

      // Successful response
      res.json({
        status: "success",
        payload: updatedUser,
        message: "user information updated",
      });
    } catch (error) {
      // Handle errors
      res.status(400).json({ status: "error", message: error.message });
    }
  }
);

usersRouter.delete("/:id", deleteController);
