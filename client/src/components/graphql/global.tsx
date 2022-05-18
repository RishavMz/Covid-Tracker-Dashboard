import { gql } from "@apollo/client";

export const GET_GLOBAL = gql`
  query getGlobal($date: String!) {
    getGlobal(date: $date) {
      date
      totalConfirmed
      totalDeaths
      totalRecovered
      newConfirmed
      newDeaths
      newRecovered
    }
  }
`;
