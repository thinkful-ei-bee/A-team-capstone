import React from 'react';
import { Route, Switch } from "react-router-dom";
import TopNav from './Components/TopNav/TopNav';
import MainPage from './Components/MainPage/MainPage'
import Login from './routes/Login/Login'
import Registration from './routes/Registration/Registration'
import NewProjectForm from './Components/NewProjectForm/NewProjectForm';
import Profile from './Components/Profile/Profile';
import MblNav from './Components/MblNav/MblNav';


export default class App extends React.Component {

  state = {
    hamburgerOpen: false
  }

  swapOpen = () => {
    this.setState({
        hamburgerOpen: !this.state.hamburgerOpen
    });
  } 

  render() {
    return (
      <div className="App">
        <TopNav swapOpen={this.swapOpen}></TopNav>
        <MblNav open={this.state.hamburgerOpen}/>
        <main>
          <Switch>
            <Route exact path={"/"} component={MainPage} />
            <Route path={"/login"} component={Login} />
            <Route path={"/register"} component={Registration} />
            <Route path={"/new-project"} component={NewProjectForm} />
            <Route path={"/profile"} component={Profile} />
          </Switch>
        </main>
      </div>
    );
  }    
}

