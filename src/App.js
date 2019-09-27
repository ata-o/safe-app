import React from 'react';
import './App.css';

import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import { useMutation } from '@apollo/react-hooks';

const client = new ApolloClient({
    uri: 'https://test.creosafe.io/graphql',
});

function Marketplace() {
  return '@TODO'
}

const loginQuery = gql`
    mutation ($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        me {uuid fullname}
      }
    }

`;

function App() {
  const [login, {data, loading, error}] = useMutation(
    loginQuery,
    {client, variables: {email: 'buyer@creosafe.com', password: 'demo03'}},
  )
  console.log({data, loading, error});
  
  return (
    <div className="App">
      <header className="App-header">
        {!data && <button onClick={login}>Login</button>}
        {loading && 'Loading...'}
        {error && 'Error!'}
        {data && (
          <>
          <h3>Welcome {data.login.me.fullname}</h3>
          <Marketplace />
          </>
        )}
        
      </header>
    </div>
  );
}

export default App;
