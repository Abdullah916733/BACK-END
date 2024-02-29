const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/firstDatabase")
  .then(() => console.log(" connection successfull!"))
  .catch((error) => console.log(error));

const firstDatabaseSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
    validate(value){
      if(value < 0){
           throw new Error("number should not be negative")
      }
    }
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// collection creation
const user = new mongoose.model("user", firstDatabaseSchema);


// insert one data in database

const handleDatabase = async () => {
      try{

         const addUser = user({
          name : "nazneen Ansari",
          email:"nazneen@gmail.com",
          age:-18
         })

         const result = await user.insertMany([addUser]);
         console.log(result);
         
      }catch(error){
        console.log(error)
      }
}

// handleDatabase()

const DatabaseFunc = async () => {
  try {
    const firstUser = user({
      name: "Abdullah Ansari",
      email: "abdullahansari@.com",
      age: 22,
    });

    const secondUser = user({
      name: "Abdul Rehman Ansari",
      email: "abdulrehman@.com",
      age: 24,
    });

    const thirdUser = user({
      name: "Amrin Ansari",
      email: "amrin@.com",
      age: 20,
    });

    const result = await user.insertMany([firstUser, secondUser, thirdUser]);

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

DatabaseFunc();

// mongoDB find  method

const usersFind = async () => {
  try {
    const findResult = await user
      .find({ age: 22 })
      .select({ name: 1 })
      .limit(1);
    console.log(findResult);
  } catch (error) {
    console.log(error);
  }
};

// usersFind();

// update document

const userUpdate = async (_id) => {
  try {
    let updateResult = await user.updateOne(
      { _id },
      {
        $set: {
          name: "Amrin Ansari",
        },
      }
    );

    console.log(updateResult);
  } catch (err) {
    console.log(err);
  }
};

// userUpdate("639d699473a80a682cd667ac");


// delete document

const userDelete = async (_id) => {
   try{
      const deleteResult = await user.findByIdAndDelete({_id});
      console.log(deleteResult)
   }catch(error){
    console.log(error);
   }
}

// userDelete("639d62de31b74a6e61177029");
