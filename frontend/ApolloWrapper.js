import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import React, { Component } from "react";
import { AsyncStorage } from "react-native";
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

const client = new ApolloClient({
  link: authLink.concat(httpLink)
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      token: token ? `Bearer ${token}` : ""
    }
  };
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
