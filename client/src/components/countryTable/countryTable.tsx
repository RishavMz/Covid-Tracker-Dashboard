import * as React from "react";
import { GET_COUNTRY_ALL } from "../graphql/country";
import { client } from "../../index";
import "./countryTable.css";

interface CountryTableProps {
  date: any;
}

interface CountryTableState {
  allCountries: any;
  countryName: any;
  countries: any;
}

class CountryTable extends React.Component<
  CountryTableProps,
  CountryTableState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      allCountries: [],
      countries: [],
      countryName: "",
    };
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount = async () => {
    await client
      .query({ query: GET_COUNTRY_ALL, variables: { date: this.props.date } })
      .then((res: any) => {
        this.setState({
          allCountries: res.data.getCountryAll,
          countries: res.data.getCountryAll,
        });
      });
  };
  changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("Called")
    this.setState({ [e.target.name]: e.target.value } as any);
    const newCountries = this.state.allCountries.filter((country: any) => {
      return country.countryName
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    this.setState({ countries: newCountries });
  };
  render() {
    return (
      <div className="countryTableHolder">
        <div className="countryTable">
          <div className="countryPanelTitle">
            <b>
              <input
                type="text"
                name="countryName"
                className="countryname"
                value={this.state.countryName}
                onChange={this.changeHandler}
                placeholder="Country Name"
              ></input>
              <div className="countryData">Total Confirmed</div>
              <div className="countryData">Total Deaths</div>
              <div className="countryData">Total Recovered</div>
              <div className="countryData">New Confrmed</div>
              <div className="countryData">New Deaths</div>
              <div className="countryData">New Recovered</div>
            </b>
          </div>
          {this.state.countries.map((e: any) => {
            return (
              <div className="countryPanel" key={e.countryName}>
                <div className="countryName">{e.countryName}</div>
                <div className="countryData">{e.totalConfirmed}</div>
                <div className="countryData">{e.totalDeaths}</div>
                <div className="countryData">{e.totalRecovered}</div>
                <div className="countryData">{e.newConfirmed}</div>
                <div className="countryData">{e.newDeaths}</div>
                <div className="countryData">{e.newRecovered}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CountryTable;
