import React from 'react';
import { Loader } from 'semantic-ui-react'
import './App.css';


import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Query } from "react-apollo";


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
      query ($orderby: Array!, $count: Int!) {
        listing(orderby: $orderby, count: $count) {
          hashid
          seller
          amount
          price
          created_at
        }
      }
`;


function Marketplace(uuid) {
  
  const count = 10;
  const orderby = [{
    SortOrder: 'ASC'
  }];
  const {data, loading, error } = useQuery(
    listingsQuery,
    {client, variables: { orderby, count } }
  );

  return (
    <div className="Marketplace">
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
          <Marketplace uuid={data.login.me.uuid} />
          </>
        )}
        
      </header>
    </div>
  );
}

export default App;
