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
  
  checkHeight = () =>{
    const htmlElem = document.getElementsByTagName('body');
    console.log(htmlElem);
    console.log(window);
    if (htmlElem.clientHeight !== window.outerHeight){
      console.log('not full screen')
      // check to see if the html doc is full screen of the window

      //set class here
      htmlElem.classList.add('lessthanfullscreen');
    }
  }


  render() {
    this.checkHeight()
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

