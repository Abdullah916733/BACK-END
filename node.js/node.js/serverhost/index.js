
const http = require("http");
const fs = require("fs");

 const server = http.createServer((req,res) => {

     if(req.url == '/'){
     res.end("server is working. add new web design");
     }else if(req.url == '/about'){
        res.end("hello this is about page")
     }
     else if(req.url == '/user'){
         // only api json value test in postman website.
            fs.readFile(`${__dirname}/serverJson.json`,"utf-8",(err,data) => {
        //     const jsonValue = JSON.parse(data);
        //     res.end(jsonValue)
            console.log(data)
        });
     }else{
        res.writeHead(404 , {'Content-type' : 'text/html'})
        res.end("this is 404 page")
     }
 })

  server.listen(8000,'127.0.0.1',() => {
      console.log("server Page is ready!")
  })
