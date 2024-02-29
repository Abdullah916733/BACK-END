const data = {
  name: "Abdullah",
  age: 22,
  office: "3 minds digital",
};

const jsonValue = JSON.stringify(data);

const fs = require("fs");

fs.writeFile("firstJson.json", jsonValue, (err) => console.log("file ready!"));

fs.readFile("firstJson.json", "utf-8", (err, data) =>
  console.log(JSON.parse(data))
);
