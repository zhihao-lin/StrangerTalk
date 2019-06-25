const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const mingoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true
}))

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000 ...');
})