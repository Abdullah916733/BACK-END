const express = require("express");
const router = require("./routers/mensRouter");
require("./db/connt");

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(
    `localhost connection successfully on this  ${port} port number.`
  );
});
