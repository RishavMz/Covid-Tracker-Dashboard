import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://127.0.0.1:5000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App email={""} firstname={""} lastname={""} authenticate={""} deauthenticate={""}/>
    </ApolloProvider>,
  </React.StrictMode>,
  document.getElementById("root")
);