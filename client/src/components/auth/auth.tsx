import * as React from "react";
import { ADD_USER, AUTH_USER } from "../graphql/auth";
import { client } from "../../index";
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
  message: any;
  messagestatus: any;
  signedup: any;
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
      message: " ",
      messagestatus: 1,
      signedup: false
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleSignUp = async(e: any) => {
    e.preventDefault();
    if(this.state.signupPassword === this.state.signupPasswordC) {
        this.setState({signedup: true, message: "Signup Successful", messagestatus: 1}) 
        await client.mutate({ mutation: ADD_USER , variables: {
            firstname: this.state.signupFirstName,
            lastname: this.state.signupLastName,
            email: this.state.signupEmail,
            password: this.state.signupPassword
        }});
    } else {
        this.setState({message: "Passwords do not match: Please Type passwords again", messagestatus: 0});
    }
  };
  handleLogin = async(e: any) => {
    e.preventDefault();
    await client.query({ query: AUTH_USER , variables: {
        email: this.state.loginEmail,
        password: this.state.loginPassword
    }}).then((res:any) => {
         console.log(res)
        if(res.data.authUser.email) {
            this.props.authenticate({
              email: res.data.authUser.email,
              firstname: res.data.authUser.firstname,
              lastname: res.data.authUser.lastname,
            });
        }
    }).catch((err: any) => {
      this.setState({message: "Incorrect password", messagestatus: 0});
    });
  };
  changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value } as any);
  };
  render() {
    return (
      <div className="auth">
          <div className={this.state.messagestatus===1?" message success":"message warning"}>{this.state.message}</div>
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
            onClick={this.handleSignUp} disabled={this.state.signedup}
          >
            SIGN UP
          </button>
        </form>
        <div className="logo">
            <div className="ball"></div>
            <div className="moon1"></div>
            <div className="moon2"></div>
            <div className="moon3"></div>
            <div className="line1">COVID</div>
            <div className="line2">TRACKING</div>
            <div className="line3">DASHBOARD</div>
        </div>
      </div>
    );
  }
}

export default Auth;
