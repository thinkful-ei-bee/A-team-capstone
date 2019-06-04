import React from 'react';
import { Route, Switch } from "react-router-dom";
import TopNav from './Components/TopNav/TopNav'
import Login from './routes/Login/Login'

function App() {
  return (
    <div className="App">
      <TopNav></TopNav>
      <main>
          <Switch>
            {/* <Route exact path={"/"} component={Landing} />
            <Route path={"/bmFeed"} component={BlogFeed} /> */}
            <Route path={"/login"} component={Login} />
            {/* <Route path={"/register"} component={Registration} />
            <PrivateRoute path={"/create_post"} component={Create_Post} />
            <Route exact path={"/post/:postId"} render={props => <PostPage {...props}/>}/>
            <Route exact path={"/result/:resultId"} render={props => <ResultPage {...props}/>}/>
            <Route exact path={"/account/:username"} render={props => <SubscriberPage {...props}/>}/>
            <Route component={PageNotFound}/> */}
          </Switch>
          {/* <Footer></Footer> */}
        </main>
    </div>
  );
}

export default App;
