import * as React from "react";
import GloalData from "../globalData/globalData";
import CountryTable from "../countryTable/countryTable";
import "./main.css";

interface MainProps {
  email: any;
  firstname: any;
  lastname: any;
  deauthenticate: any;
}

interface MainState {
  firstname: any;
  lastname: any;
  date: any;
}

class Main extends React.Component<MainProps, MainState> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      date:
      String(new Date().toJSON().slice(0, 4)) +
      "-" +
      String(new Date().toJSON().slice(5, 7)) +
      "-" +
      String(new Date().toJSON().slice(8, 10)),
    };
    this.logout = this.logout.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const data =
      e.target.value[8] +
      e.target.value[9] +
      "-" +
      e.target.value[5] +
      e.target.value[6] +
      "-" +
      e.target.value[0] +
      e.target.value[1] +
      e.target.value[2] +
      e.target.value[3];
    this.setState({ [e.target.name]: e.target.value, atDate: data } as any);
  };
  logout = () => {
    this.props.deauthenticate();
  };
  render() {
    return (
      <div className="main">
        <div className="navbar">
          <span className="title dateinput">COVID TRACKING DASHBOARD</span>
          <button type="submit" className="logoutbtn" onClick={this.logout}>
            LOGOUT
          </button>
        </div>
        <hr className="line" />
        <div className="dashboard">
          <GloalData onDate={this.state.date} />
          <CountryTable date={this.state.date} />
        </div>
      </div>
    );
  }
}

export default Main;
