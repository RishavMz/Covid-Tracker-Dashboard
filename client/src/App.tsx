import './App.css';
import * as React from 'react';
import Auth from './components/auth/auth';
import Main from './components/main/main';

interface AppProps {
  email :    any,
  firstname: any,
  lastname:  any
  authenticate: any,
  deauthenticate: any
}
 
interface AppState {
  email :    any,
  firstname: any,
  lastname:  any,
  loggedIn: Boolean
}
 
class App extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { 
      email :   this.props.email,
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      loggedIn: false
    }
    this.authenticateHelper = this.authenticateHelper.bind(this);
    this.deauthenticateHelper = this.deauthenticateHelper.bind(this);
  }
  authenticateHelper = (data: any) => {
    this.setState({
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      loggedIn: true
    })
  }
  deauthenticateHelper = () => {
    this.setState({
      email: "",
      firstname: "",
      lastname: "",
      loggedIn: false
    })
  }
  
  render() { 
    return ( 
    <div className="App">
      {this.state.loggedIn===false ? <Auth authenticate={this.authenticateHelper}/> : <Main deauthenticate={this.deauthenticateHelper} email={this.state.email} firstname={this.state.firstname} lastname={this.state.lastname}/>}
    </div> );
  }
}
 
export default App;
