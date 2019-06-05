import React from 'react';
import { Route, Switch } from "react-router-dom";
import TopNav from './Components/TopNav/TopNav';
import MainPage from './Components/MainPage/MainPage'
import Login from './routes/Login/Login'
import Registration from './routes/Registration/Registration'
import NewProjectForm from './Components/NewProjectForm/NewProjectForm';

function App() {
  return (
    <div className="App">
      <TopNav></TopNav>
      <main>
        <Switch>
          <Route exact path={"/"} component={MainPage} />
          <Route path={"/login"} component={Login} />
          <Route path={"/register"} component={Registration} />
          <Route path={"/new-project"} component={NewProjectForm} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
