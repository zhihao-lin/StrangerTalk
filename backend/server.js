const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP(req => ({
    schema,
    graphiql: true,
    context: { user: req.headers }
  }))
);

app.listen(4000, () => {
  console.log("Now listening for requests on port 4000 ...");
});

mongoose.connect(
  "mongodb+srv://j1a0m0e4s:%23Xup654cl4@cluster0-1ysgh.gcp.mongodb.net/test?retryWrites=true",
  {
    useNewUrlParser: true
  }
);

db = mongoose.connection;
db.on("error", error => {
  console.log("Error: DB connection failed!:");
  console.log(error);
});
