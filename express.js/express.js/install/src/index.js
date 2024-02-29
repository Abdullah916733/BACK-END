const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const requests = require("request");

const port = 8000;

const publicPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    name: "Abdullah",
  });
});

app.get("/about" , (req, res) => {
  requests(
    `https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=a2965fec14e12173b1203c71d7ee815d`
  )
    .on("data", (chunk) => {
      const objData = JSON.parse(chunk);
      const arrData = [objData];
      console.log(` data temprature ${arrData}`)
        res.write(arrData[0].name);
    })
    .on("end", (err) => {
      if (err) return console.log("connection closed due to errors", err);
      // console.log("end");
       res.end();
    });
})

app.get("*", (req, res) => {
  res.render("404", {
    pageName: "404 Page",
  });
});

// app.use(express.static(publicPath))

app.get("/", (req, res) => {
  res.send("server is Working");
});

app.listen(port, () => {
  console.log("server is Working!");
});
