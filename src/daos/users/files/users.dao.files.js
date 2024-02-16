import fs from "fs/promises";
import { matches } from "../../utils.js";

export class UsersDaoFiles {
  constructor(path) {
    this.path = path;
  }

  async #readUsers() {
    return JSON.parse(await fs.readFile(this.path, "utf-8"));
  }

  async #writeUsers(users) {
    await fs.writeFile(this.path, JSON.stringify(users, null, 2));
  }

  async create(userPojo) {
    const users = await this.#readUsers();
    users.push(userPojo);
    await this.#writeUsers(users);
    return userPojo;
  }

  async readOne(query) {
    const users = await this.#readUsers();
    const searched = users.find(matches(query));
    return searched;
  }

  async readMany(query) {
    const users = await this.#readUsers();
    const manySearched = users.filter(matches(query));
    return manySearched;
  }

  async updateOne(query, data) {
    let users = await this.#readUsers();
    const index = users.findIndex(matches(query));

    if (index !== -1) {
      const updatedUser = { ...users[index], ...data }; // Merging
      users[index] = updatedUser;
      await this.#writeUsers(users);
      return updatedUser;
    } else {
      return null; // Indicate not found
    }
  }

  async updateMany(query, data) {
    let users = await this.#readUsers();
    let updatedCount = 0; // To track updates potentially

    users = users.map((user) => {
      if (matches(query)(user)) {
        updatedCount++;
        return { ...user, ...data }; // Merge, if a match
      } else {
        return user;
      }
    });

    await this.#writeUsers(users);
    return updatedCount; // Example: Return an updated record count.
  }

  async deleteOne(query) {
    const users = await this.#readUsers();
    const indexSearched = users.findIndex(matches(query));
    if (indexSearched !== -1) {
      const [searched] = users.splice(indexSearched, 1);
      await this.#writeUsers(users);
      return searched;
    }
    return null;
  }

  async deleteMany(query) {
    let users = await this.#readUsers();
    const filteredUsers = users.filter((user) => !matches(query)(user)); // Removing if condition is met

    await this.#writeUsers(filteredUsers);
    return users.length - filteredUsers.length; // Count of the deleted items
  }
}
