const moongose = require("mongoose");

moongose
  .connect("mongodb://127.0.0.1:27017/olympic", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successfully connected"))
  .catch((err) => console.log(err));
