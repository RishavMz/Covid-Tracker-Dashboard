import { gql } from "@apollo/client";

export const GET_COUNTRY = gql`
    query getCountry ($countryName: String!) {
        getCountry (countryName: $countryName) {
            countryName
            totalDeaths
            totalConfirmed
            totalRecovered
            newDeaths
            newConfirmed
            newRecovered
        }
    }
`;

export const GET_COUNTRY_ALL = gql`
    query getCountryAll ($date: String!) {
        getCountryAll (date: $date) {
            countryName
            totalDeaths
            totalConfirmed
            totalRecovered
            newDeaths
            newConfirmed
            newRecovered
        }
    }
`;

export const GET_COUNTRY_DATE = gql`
    query getCountryDate ($slug1: String!, $slug2: String!) {
        getCountryDate (countryName: $slug1, date: $slug2) {
            countryName
            totalDeaths
            totalConfirmed
            totalRecovered
            newDeaths
            newConfirmed
            newRecovered
        }
    }
`;