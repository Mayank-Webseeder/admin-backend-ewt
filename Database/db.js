const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect(
      "mongodb+srv://ewt:12345@cluster0.gotvozb.mongodb.net/blog-app?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log("there was some error", err);
    });
}

module.exports = connect;
