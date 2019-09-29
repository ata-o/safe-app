import React from 'react';
import { Loader } from 'semantic-ui-react'
import ReactTable from'react-table' 
import 'react-table/react-table.css'
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
      query ($count: Int!) {
        marketplace(count: $count) {
          data {
            hashid,
            seller {
              fullname
            }
            amount,
            price,
            created_at
          }
        }
      }
`;

function Marketplace(uuid) {

  const count = 100;
  const {marketplace, data, loading, error } = useQuery(
    listingsQuery,
    {client, variables: { count, uuid } }
  );
  console.log(marketplace);

  const columns = [{
    Header: 'HashID',
    accessor: 'hashid'
  }, {
    Header: 'Seller',
    accessor: 'seller'
  }, {
    Header: 'Amount',
    accessor: 'amount'
  }, {
    Header: 'Price',
    accessor: 'price'
  }, {
    Header: 'Date',
    accessor: 'created_at'
  }];
    
    
  return (
    <div className="Marketplace">
        {loading && <Loader />}
        {error && 'Error!'}
        {data && (
          <ReactTable 
          defaultPageSize={20}
          data={data.marketplace}
          columns={columns} />
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
