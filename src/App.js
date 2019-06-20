import React from 'react';
import { Route, Switch } from "react-router-dom";
import TopNav from './Components/TopNav/TopNav';
import MainPage from './routes/MainPage/MainPage'
import Login from './routes/Login/Login'
import Registration from './routes/Registration/Registration'
import NewProjectForm from './Components/NewProjectForm/NewProjectForm';
import MblNav from './Components/MblNav/MblNav';
import LandingPage from './routes/LandingPage/LandingPage';
import ProjectCommentsForm from './Components/ProjectsCommentsForm/ProjectsCommentsForm';
import Project from './routes/Project/Project'
import { withRouter } from 'react-router-dom';

class App extends React.Component {

  state = {
    hamburgerOpen: false
  }

  swapOpen = () => {
    this.setState({
        hamburgerOpen: !this.state.hamburgerOpen
    });
  }
  
  closeHamburger = () => {
    this.setState({
      hamburgerOpen: false
    })
  }

  checkHeight = () =>{
    const htmlElem = document.getElementsByTagName('html')[0];
    // need to check if other browsers support html.clientHeight as well as window.outerHeight
    if (htmlElem.scrollHeight < window.innerHeight){
      // check to see if the html doc is full screen of the window

      //return class here
      return 'lessthanfullscreen';
    }
    return '';
  }


  render() {
    const fullScreenClass = this.checkHeight()
    return (
      <div className={`App ${fullScreenClass}`}>
        <TopNav swapOpen={this.swapOpen} history={this.props.history}></TopNav>
        <MblNav open={this.state.hamburgerOpen}/>
        <main onClick={this.closeHamburger}>
          <Switch>
          <Route exact path={"/landing"} component={LandingPage} />
          <Route exact path={"/comments"} component={ProjectCommentsForm} />
            <Route exact path={"/"} component={MainPage} />
            <Route path={"/login"} component={Login} />
            <Route path={"/register"} component={Registration} />
            <Route path={"/new-project"} component={NewProjectForm} />
            <Route path={"/projects/:id"} component={Project} />
          </Switch>
        </main>
      </div>
    );
  }    
}

export default withRouter(App);