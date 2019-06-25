import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import React, {Component} from 'react';

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql"
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