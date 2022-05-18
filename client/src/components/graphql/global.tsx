import { gql } from "@apollo/client";

export const GET_GLOBAL = gql`
    query getGlobal {
        getGlobal(date: "18-05-2022") {
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
