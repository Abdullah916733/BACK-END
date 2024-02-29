
 const EventEmitter = require("events");

 const event = new EventEmitter();

 event.on("myFunc" , (names , age) => {
    console.log(`my name is ${names} and age ${age}`)
 })

  event.on("myFunc", () => {
     console.log("events is working");
  })

 event.emit("myFunc" , "Abdullah" , 22);