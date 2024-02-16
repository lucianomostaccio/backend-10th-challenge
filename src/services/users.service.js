import { User } from "../models/users.model.js";
import { createHash } from "../utils/hashing.js";

export class UsersService {
  constructor({ usersDao, productsDao }) {
    this.usersDao = usersDao;
    this.productsDao = productsDao;
  }

  // Load users from the database
  async loadUsersFromDatabase() {
    return await this.usersDao.readMany();
  }

  async addUser(data) {
    console.log("entered addUser in users.service")
    const user = new User(data);
    console.log("user (before toPOJO):", user); // Inspect directly 
    console.log("Data to be saved:", user.toPOJO()); // Examine after toPOJO 
    await this.usersDao.create(user.toPOJO());
    // console.log("Saved user:", savedUser);
    return user;
  }

  // Get user by ID
  async getUserById(_id) {
    return await this.usersDao.readOne({ _id });
  }

  // Update user by ID
  async updateUser(_id, updatedUser) {
    try {
      const userToUpdate = await this.usersDao.readOne({ _id });

      if (!userToUpdate) {
        console.error("User not found for update");
        return null;
      }

      Object.assign(userToUpdate, updatedUser);

      await this.usersDao.updateOne({ _id }, userToUpdate);
      console.log("User updated:", userToUpdate);
      return userToUpdate;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async updatePassword(userId, newPassword) {
    const hashedPassword = createHash(newPassword);
    const updatedUser = await this.usersDao.findOneAndUpdate(
      { _id: userId },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  }

  // Delete user by ID
  async deleteUser(_id) {
    try {
      const deletedUser = await this.usersDao.deleteOne({ _id });

      if (deletedUser) {
        console.log("User deleted:", deletedUser);
        return deletedUser;
      } else {
        console.error("User not found for deletion");
        return null;
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}
