const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const url = `mongodb+srv://AbdullahAnsari:8879464201@cluster0.mkrkrvi.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect("mongodb://127.0.0.1:27017/student-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("connection is successful"))
  .catch((err) => console.log(err));

// const connectDB = async () => {
//   try {
//     const connect = await mongoose.connect(url, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     });
//     console.log(`MongoDB Connected: ${connect.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit();
//   }
// };

// module.exports = connectDB;
