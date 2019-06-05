import React from 'react';
import { Route, Switch } from "react-router-dom";
import TopNav from './Components/TopNav/TopNav';
import MainPage from './Components/MainPage/MainPage'
import Login from './routes/Login/Login'
import Registration from './routes/Registration/Registration'
import NewProjectForm from './Components/NewProjectForm/NewProjectForm';
<<<<<<< HEAD
import Profile from './Components/Profile/Profile';
=======
import MblNav from './Components/MblNav/MblNav';

>>>>>>> ea9ab2d451e3e5da6b7113bc59d90da9ad0203a4

function App() {

  return (
    <div className="App">
      <TopNav></TopNav>
      <MblNav />
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

export default App;
