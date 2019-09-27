import React from 'react';
import { Loader } from 'semantic-ui-react'
import './App.css';


import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import { useMutation, useQuery } from '@apollo/react-hooks';

const client = new ApolloClient({
    uri: 'https://test.creosafe.io/graphql',
});

const loginQuery = gql`
    mutation ($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        me {uuid fullname}
      }
    }

`;

// Hash ID, Seller Name, Amount, Price (ETH) and Creation Date
const listingsQuery = gql`
    {
      query fetchListings($count: Int!) {
        listing (count: $count) {
          uuid
          hashid
          seller
          amount
          price
          created_at
        }
      }
        
        
    }
`;

function Marketplace() {
  const {data, loading, error} = useQuery(
    listingsQuery,
    {client, variables: {count: 10}},
  );

  console.log({data, loading, error});
  
  return (
    <div className="Marketplace">
      {!data && <button>Fetch</button>}
        {loading && <Loader />}
        {error && 'Error!'}
        {data && (
          <>
          <h3>listings</h3>
          
          </>
        )}
    </div>

  );
}

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
        {loading && <Loader />}
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
