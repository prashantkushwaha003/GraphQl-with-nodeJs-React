import BookList from "./componet/book_list"
import AddBook from "./componet/add_book"
import React,{ Component } from "react";
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from '@apollo/client';

const link = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});


class App extends Component {
  render() {
    return (
        
      <ApolloProvider client={client}>
        <h1>GraphQL</h1>
        <div>
          <BookList></BookList>
          <AddBook></AddBook>
        </div>
        
     </ApolloProvider>

  
  );
  }
}
export default App;
