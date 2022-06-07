import * as React from "react";
import "./globalData.css";
import { GET_GLOBAL, GET_GLOBAL_TREND } from "../graphql/global";
import { client } from "../../index";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Daily cases",
    },
  },
};


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
  graphConfirmed: any;
  graphDeaths: any;
  graphRecovered: any;
  chartData: any;
  datasets: any;
  labels: any;
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
    graphConfirmed: [],
    graphDeaths: [],
    graphRecovered: [],
    chartData: {},
    labels: [],
    datasets: { 
      labels: [],
      datasets: [
      {
        label: "Confirmed",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Deaths",
        data: [],
        borderColor: "rgb(99, 255, 132)",
        backgroundColor: "rgba(99, 255, 132, 0.5)",
      },
      {
        label: "Recovered",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],}
  };
  componentDidMount = async () => {
    await client
      .query({
        query: GET_GLOBAL,
        variables: {
          date:
            String(new Date().toJSON().slice(0, 4)) +
            "-" +
            String(new Date().toJSON().slice(5, 7)) +
            "-" +
            String(new Date().toJSON().slice(8, 10)),
        },
      })
      .then((res) => {
        if(res.data.getGlobal) {
          this.setState({
            totalConfirmed: res.data.getGlobal.totalConfirmed,
            totalDeaths: res.data.getGlobal.totalDeaths,
            totalRecovered: res.data.getGlobal.totalRecovered,
          });
        }
      });
    await client
      .query({ query: GET_GLOBAL_TREND })
      .then((res) => {
        this.setState({ last10: res.data.getGlobalTrend });
        const confirmed: any = [],
          deaths: any = [],
          recovered: any = [];
        //console.log(JSON.stringify(res.data.getGlobalTrend));
        res.data.getGlobalTrend.forEach((data: any) => {
          //console.log(JSON.stringify(data));
          confirmed.unshift(data.totalConfirmed);
          deaths.unshift(data.totalConfirmed);
          recovered.unshift(data.totalDeaths);
        });
          this.setState({
            labels: Array(confirmed.length).join(".").split("."),
            datasets: { 
              labels: Array(confirmed.length).join(".").split("."),
              datasets: [
              {
                label: "Confirmed",
                data: confirmed,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
              {
                label: "Deaths",
                data: deaths,
                borderColor: "rgb(99, 255, 132)",
                backgroundColor: "rgba(99, 255, 132, 0.5)",
              },
              {
                label: "Recovered",
                data: recovered,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],}
          })
      })
      .catch((err) => {
        console.log(err);
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
        <div className="globalTrends canvas" id="canvas">
          <Line options={options} data={this.state.datasets} />
        </div>
      </div>
    );
  }
}

export default GloalData;
