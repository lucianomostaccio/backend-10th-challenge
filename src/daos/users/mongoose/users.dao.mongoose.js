import { toPOJO } from "../../utils.js";


export class UsersDaoMongoose {
  constructor(usersModel) {
    this.usersModel = usersModel;
  }

  async create(data) {
    const user = await this.usersModel.create(data);
    return toPOJO(user);
  }

  //   async readOne(query) {
  //     return toPOJO(await this.usersModel.findOne(query).lean());}

  async readOne(email) {
    const userDoc = await this.usersModel
      .findOne(email)
      .lean();
      console.log(userDoc)
  
    // Populate orders if necessary
    // if (userDoc) {
    //   await userDoc.populate("orders").execPopulate(); // Populate the orders
    // }
  
    return toPOJO(userDoc); // Apply toPOJO and return in a single step
  }
  

  async readMany(query) {
    return toPOJO(await this.usersModel.findMany(query).lean());
  }

  async updateOne(query, data) {
    await this.usersModel.updateOne(query, data);
    return toPOJO(await this.usersModel.findOne(query).lean());
  }

  async updateMany(query, data) {
    await this.usersModel.updateMany(query, data);
    return toPOJO(await this.usersModel.findMany(query).lean());
  }

  async deleteOne(query) {
    return toPOJO(await this.usersModel.findOneAndDelete(query).lean());
  }

  async deleteMany(query) {
    await this.usersModel.deleteMany(query);
    return null;
  }
}
