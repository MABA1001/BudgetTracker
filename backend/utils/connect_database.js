const mongoose  = require("mongoose");
async function connect_database() {
    try {
      const connection = await mongoose.connect(process.env.CONNECTION_STRING);
      if (connection) {
        console.log("database connected");
      }
    } catch (err) {
      console.log(err);
    }
  }

  module.exports = connect_database;