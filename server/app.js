const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema.js');
const cors = require('cors');

const app = express();
app.use(cors());


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://prashantkushwaha003:test123@cluster0.cscusqu.mongodb.net/?retryWrites=true&w=majority', 
{useNewUrlParser: true },(err) => {
    {
      if(err) {
          console.log('Some problem with the connection ' +err);
      } else {
          console.log('The Mongoose connection is ready');
      }
    }
  })



app.use('/graphql', graphqlHTTP({
  schema,   
  graphiql: true
}));

app.listen(4000, () => {
    console.log('listning port:4000')
});
