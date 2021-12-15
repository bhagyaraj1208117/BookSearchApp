const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

let db = null;
/*mongoose.connect(
  "mongodb+srv://booksData:1230@cluster0.00chf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("connected to mongo db");
});
*/
const initializeDBAndServer = () => {
  app.listen(3000, () => {
    console.log("Server Running at http://localhost:3000/");
  });
};
initializeDBAndServer();

app.use(
  "/graphql",
  graphqlHTTP.graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
