// const message = require("../../models/messagesModel.js");

// class MessagesManager {
//   async create(data) {
//     try {
//       let newMessage = new message(data);
//       await newMessage.save();
//       return newMessage;
//     } catch (error) {
//       throw new Error(`Error creating the message: ${error.message}`);
//     }
//   }

//   async findAll() {
//     try {
//       let messages = await message.find();
//       return messages;
//     } catch (error) {
//       throw new Error(`Error obtaining all messages: ${error.message}`);
//     }
//   }
// }

// const messagesManager = new MessagesManager();

// module.exports = messagesManager;
