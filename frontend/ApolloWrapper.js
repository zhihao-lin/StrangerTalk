import { ApolloProvider } from "react-apollo";
import React, { Component } from "react";
import { AsyncStorage } from 'react-native'
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

let token = ''

setToken = async () => {
    token  = await AsyncStorage.getItem('token');
    console.log(token)
}

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  setToken()
  console.log(token)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token: token ? token: ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});





export default function ApolloWrapper(CMP) {
  return class MainWrapped extends Component {
    constructor(props) {
      super(props);
      this.apolloClient = client;
    }

    render() {
      return (
        <ApolloProvider client={this.apolloClient}>
          <CMP />
        </ApolloProvider>
      );
    }
  };
}
