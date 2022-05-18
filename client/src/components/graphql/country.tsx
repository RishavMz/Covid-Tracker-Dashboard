import { gql } from "@apollo/client";

export const GET_COUNTRY = gql`
    query getCountry ($slug: String!) {
        getCountry (countryName: $slug) {
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
    query getCountryAll  {
        getCountryAll {
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