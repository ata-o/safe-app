import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import ApolloClient from 'apollo-boost';
// import { gql } from "apollo-boost";
// import { useMutation } from '@apollo/react-hooks';



// const client = new ApolloClient({
//     uri: 'https://test.creosafe.io/graphql',
// });

// const loginQuery = gql`
//   {
//     login(email: "buyer@creosafe.com", password: "demo03") {
//       email
//     }
//   }
// `;

// const [login, { data }] = useMutation(loginQuery);



// client
//   .query({
//     query: gql`
//     {
//       "email": "buyer@creosafe.com",
//       "password": ""
//     }
//     `
//   })
//   .then(result => console.log(result));

ReactDOM.render(<App />, document.getElementById('root'));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
