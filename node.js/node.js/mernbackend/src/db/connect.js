const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://127.0.0.1:27017/${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connnection successfully"))
  .catch((err) => console.log(err));
