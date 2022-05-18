import { gql } from "@apollo/client";

export const GET_COUNTRY = gql`
  query getCountry($countryName: String!) {
    getCountry(countryName: $countryName) {
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
  query getCountryAll($date: String!) {
    getCountryAll(date: $date) {
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
  query getCountryDate($countryName: String!, $date: String!) {
    getCountryDate(countryName: $countryName, date: $date) {
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
