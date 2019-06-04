import React from 'react';
import { Route, Switch } from "react-router-dom";
import TopNav from './Components/TopNav/TopNav'
import Login from './routes/Login/Login'
import Registration from './routes/Registration/Registration'
import NewProjectForm from './Components/NewProjectForm/NewProjectForm';

function App() {
  return (
    <div className="App">
      <TopNav></TopNav>
      <main>
        <Switch>
          <Route path={"/login"} component={Login} />
          <Route path={"/register"} component={Registration} />
          <Route path={"/new"} component={NewProjectForm} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
