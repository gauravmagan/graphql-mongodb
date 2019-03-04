const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config({path :"variables.env"});
const Recipe = require("./models/Recipe");
const User = require("./models/User");

//Brings graphql middleware

const {graphiqlExpress,graphqlExpress} = require("apollo-server-express");
const {makeExecutableSchema} = require("graphql-tools");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

// create Schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

//Connects the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log (' DB Connected '))
  .catch(err => console.error(err));


//Initializes application

const app = express();




//create graphql application
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql"}
));







//Connects schema to graphql
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      Recipe,
      User
    }
}));






const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
   console.log(`server listening on PORT  ${PORT}`);
});
