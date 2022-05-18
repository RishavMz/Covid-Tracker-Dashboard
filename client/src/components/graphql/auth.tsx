import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation addUser($firstname: String!, $lastname: String!, $email: String!, $password: String!) {
        addUser(firstname: $firstname, lastname: $lastname, email: $email, password: $password) {

        }
    }
`;

export const AUTH_USER = gql`
    query authUser($email: String!, $password: String!) {
        authUser(email: $email: password: $password) {
            firstname
            lastname
            email
            password
        } 
    }
`;
