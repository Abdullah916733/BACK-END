const fs = require("fs");
const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  // normal method

  //  fs.readFile("input.txt" , (err,data) => {
  //      if (err) console.log(err)
  //      res.end(data.toString());
  //  })

  // stream method

//   const readStream = fs.createReadStream("input.txt");
//   readStream.on("data", (chunckdata) => res.write(chunckdata));
//   readStream.on("end", () => res.end());
//   readStream.on('error' , err => console.log(err) , res.end('file not fund'))
});

server.listen(8000, "127.0.0.1");
