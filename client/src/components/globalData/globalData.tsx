import * as React from "react";
import "./globalData.css";
import { GET_GLOBAL, GET_GLOBAL_TREND } from "../graphql/global";
import { client } from "../../index";
import Chart from "simple-chart";

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
        this.setState({
          totalConfirmed: res.data.getGlobal.totalConfirmed,
          totalDeaths: res.data.getGlobal.totalDeaths,
          totalRecovered: res.data.getGlobal.totalRecovered,
        });
      });
    await client
      .query({ query: GET_GLOBAL_TREND })
      .then((res) => {
        this.setState({ last10: res.data.getGlobalTrend });
        const confirmed: any = [],
          deaths: any = [],
          recovered: any = [];
          console.log(JSON.stringify(res.data.getGlobalTrend))
        res.data.getGlobalTrend.forEach((data: any) => {
          console.log(JSON.stringify(data));
          confirmed.unshift(data.totalConfirmed);
          deaths.unshift(data.totalConfirmed);
          recovered.unshift(data.totalDeaths);
        });
        this.setState({
          graphConfirmed: confirmed,
          graphDeaths: deaths,
          graphRecovered: recovered,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    let pieOption = {
      type: "line", // 'line', 'bar', 'radar', 'gauge'
      style: {
        colors: [
          "#f2711c",
          "#2185d0",
          "#21ba45",
          "#b5cc18",
          "#00b5ad",
          "#fbbd08",
          "#6435c9",
          "#a333c8",
          "#e03997",
          "#a5673f",
        ],
        font: "12px sans-serif",
        valueStyle: "{c}%",
        nameStyle: "{a} {c}%",
        legend: {
          orient: "horizontal", // horizontal or vertical
          position: ["center", "top"],
        },
      },
      radius: "40%", // 60% , 150
      center: ["0%", "0%"], // ['50%', '50%'], [200, 200]
      legend: ["Confirmed", "Deaths", "Recovered"],
      padding: [0, 0, 0, 0],
      xAxis: {
        type: "category",
        data: Array(this.state.graphConfirmed.length).join(".").split("."),
      },
      yAxis: {
        type: "value",
      },
      data: [
        this.state.graphConfirmed,
        this.state.graphDeaths,
        this.state.graphRecovered,
      ],
    };
    const doc = document.getElementById("canvas");
    if (doc && this.state.graphConfirmed.length>0) {
      const chart = new Chart(document.getElementById("canvas"));

      chart.setOption(pieOption);
      console.log(this.state.graphConfirmed, this.state.graphDeaths, this.state.graphRecovered)
    }
    const showAll=()=>{    }
    const showc=()=>{    }
    const showd=()=>{    }
    const showr=()=>{    }
    const show5=()=>{    }
    const show10=()=>{    }

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
        </div>
      </div>
    );
  }
}

export default GloalData;
