import { ApolloProvider } from "react-apollo";
import React, { Component } from "react";
import AsyncStorage from 'react-native'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
import { setContext } from "apollo-link-context";




const authLink = setContext((_, { headers }) => {
  const token = AsyncStorage.getItem("token");
  console.log(token)
  return {
    headers: {
      ...headers,
      token: token ? `Bearer ${token}` : ""
    }
  };
});



const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
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
