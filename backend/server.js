const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const jwt = require("jsonwebtoken");
const app = express();
const SECRET = "webfinal";
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP(req => ({
    schema,
    graphiql: true,
    context: (() => {
      const token = req.headers["token"];
      console.log(req.headers);
      if (token) {
        try {
          const me = jwt.verify(token, SECRET);
          return { me };
        } catch (e) {
          throw new Error("Your session expired. Sign in again.");
        }
      }
      return {};
    })(req)
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
