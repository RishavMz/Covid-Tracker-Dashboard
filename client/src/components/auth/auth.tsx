import * as React from "react";
import "./auth.css";

interface AuthProps {
  authenticate: any;
}

interface AuthState {
  loginEmail: any;
  loginPassword: any;
  loginFirstName: any;
  loginLastName: any;
  signupFirstName: any;
  signupLastName: any;
  signupEmail: any;
  signupPassword: any;
  signupPasswordC: any;
}

class Auth extends React.Component<AuthProps, AuthState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loginEmail: "",
      loginPassword: "",
      loginFirstName: "",
      loginLastName: "",
      signupFirstName: "",
      signupLastName: "",
      signupEmail: "",
      signupPassword: "",
      signupPasswordC: "",
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleSignUp = (e: any) => {
    e.preventDefault();
  };
  handleLogin = (e: any) => {
    e.preventDefault();
    this.props.authenticate({
      email: this.state.loginEmail,
      firstname: "",
      lastname: "",
    });
  };
  changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value } as any);
  };
  render() {
    return (
      <div className="auth">
        <form className="login">
          <div className="formfield">
            <label className="formlabel">Email</label>
            <input
              className="inputbox"
              type="email"
              name="loginEmail"
              value={this.state.loginEmail}
              onChange={this.changeHandler}
            ></input>
          </div>
          <div className="formfield">
            <label className="formlabel">Password</label>
            <input
              className="inputbox"
              type="password"
              name="loginPassword"
              value={this.state.loginPassword}
              onChange={this.changeHandler}
            ></input>
          </div>
          <button
            type="submit"
            className="btn"
            value="login"
            onClick={this.handleLogin}
          >
            LOG IN
          </button>
        </form>
        <div className="or">- - - - - - - - - - OR - - - - - - - - - - </div>
        <form className="signup">
          <div className="formfield">
            <label className="formlabel">First Name</label>
            <input
              className="inputbox"
              type="text"
              name="signupFirstName"
              value={this.state.signupFirstName}
              onChange={this.changeHandler}
            ></input>
          </div>
          <div className="formfield">
            <label className="formlabel">Last Name</label>
            <input
              className="inputbox"
              type="text"
              name="signupLastName"
              value={this.state.signupLastName}
              onChange={this.changeHandler}
            ></input>
          </div>
          <div className="formfield">
            <label className="formlabel">Email</label>
            <input
              className="inputbox"
              type="email"
              name="signupEmail"
              value={this.state.signupEmail}
              onChange={this.changeHandler}
            ></input>
          </div>
          <div className="formfield">
            <label className="formlabel">Password</label>
            <input
              className="inputbox"
              type="password"
              name="signupPassword"
              value={this.state.signupPassword}
              onChange={this.changeHandler}
            ></input>
          </div>
          <div className="formfield">
            <label className="formlabel">Confirm Password</label>
            <input
              className="inputbox"
              type="password"
              name="signupPasswordC"
              value={this.state.signupPasswordC}
              onChange={this.changeHandler}
            ></input>
          </div>
          <button
            type="submit"
            className="btn"
            value="signup"
            onClick={this.handleSignUp}
          >
            SIGN UP
          </button>
        </form>
      </div>
    );
  }
}

export default Auth;
