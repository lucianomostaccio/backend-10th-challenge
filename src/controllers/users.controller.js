import { usersService } from "../services/index.js";

// all controllers use Service's functions. In this case, usersService

export async function getController(req, res, next) {
  try {
    const user = await usersService.getUserByEmail(req.user.email);
    res.status(200).json({ status: "success", payload: user });
  } catch (error) {
    next(error);
  }
}

// register
export async function postController(req, res, next) {
  try {
    console.log("entered postController");
    const user = await usersService.addUser(req.body);
    console.log("user created by postController:", user);
    // res.result(user);
    res.created(user);
  } catch (error) {
    console.error("Error in postController:", error);
    next(error);
  }
}

//update
// export async function putController(req, res, next) {
//   try {
//     const userId = req.params.userId;
//     const updatedUser = await usersService.updateUser(userId, req.body);
//     res.result(updatedUser);
//   } catch (error) {
//     next(error);
//   }
// }
export async function putController(req, res, next) {
  try {
    const userId = req.params.userId;

    // 1. Check for Password Change Intent:
    if (req.body.password) {
      // Handle password change with specific logic
      const updatedUser = await usersService.updatePassword(
        userId,
        req.body.password
      );
      res.updated(updatedUser);
    } else {
      // 2. General Profile Updates:
      const updatedUser = await usersService.updateUser(userId, req.body);
      res.updated(updatedUser);
    }
  } catch (error) {
    next(error);
  }
}

// remove
export async function deleteController(req, res, next) {
  try {
    await usersService.deleteUser(req.params.id);
    res.deleted();
  } catch (error) {
    next(error);
  }
}
