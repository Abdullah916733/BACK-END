const fs = require("fs");
const http = require("http");
var requests = require("requests");

const readfile = fs.readFileSync("home.html", "utf-8");

const serverData = (serverValue, fileValue) => {
  let chageValue = fileValue.replace("{%country%}", serverValue.sys.country);
  chageValue = chageValue.replace("{%location%}", serverValue.name);
  chageValue = chageValue.replace("{%currentTem%}", serverValue.main.temp);
  chageValue = chageValue.replace("{%minTem%}", serverValue.main.temp_min);
  chageValue = chageValue.replace("{%maxTem%}", serverValue.main.temp_max);

  return chageValue;
};

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests(
      "https://api.openweathermap.org/data/2.5/weather?q=pune&appid=a2965fec14e12173b1203c71d7ee815d"
    )
      .on("data", (chunk) => {
        const objData = JSON.parse(chunk);
        const arrData = [objData];
        const realData = arrData.map(val => serverData(val, readfile)).join("");
        //  console.log(realData)
          res.write(realData);
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        // console.log("end");
         res.end();
      });
  }
});

server.listen(8000, "127.0.0.1");
