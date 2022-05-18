import * as React from "react";
import "./globalData.css";
import { GET_GLOBAL } from "../graphql/global";
import { client } from "../../index";

interface GloalDataProps {
  onDate: any;
}

interface GloalDataState {
  date: any;
  totalConfirmed: any;
  totalDeaths: any;
  totalRecovered: any;
  newConfirmed: any;
  newDeaths: any;
  newRecovered: any;
  last10: any;
}

class GloalData extends React.Component<GloalDataProps, GloalDataState> {
  state = {
    date: this.props.onDate,
    totalConfirmed: 0,
    totalDeaths: 0,
    totalRecovered: 0,
    newConfirmed: 0,
    newDeaths: 0,
    newRecovered: 0,
    last10: [],
  };
  componentDidMount = async () => {
    await client.query({ query: GET_GLOBAL }).then((res) => {
      this.setState({
        totalConfirmed: res.data.getGlobal.totalConfirmed,
        totalDeaths: res.data.getGlobal.totalDeaths,
        totalRecovered: res.data.getGlobal.totalRecovered,
      });
    });
  };
  render() {
    return (
      <div className="globalData">
        <div className="globalStats">
          <b>WORLDWIDE</b>
          <div className="globalLabel">Total Confirmed</div>
          <div className="globalValue">{this.state.totalConfirmed}</div>
          <div className="globalLabel">Total Deaths</div>
          <div className="globalValue">{this.state.totalDeaths}</div>
          <div className="globalLabel">Total Recovered</div>
          <div className="globalValue">{this.state.totalRecovered}</div>
        </div>
        <div className="globalTrends">
          <div>TABLE</div>
        </div>
      </div>
    );
  }
}

export default GloalData;
