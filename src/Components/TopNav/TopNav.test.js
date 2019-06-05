import React from 'react';
import ReactDOM from 'react-dom';
import TopNav from './TopNav';
import { BrowserRouter } from "react-router-dom";

it ('renders without crashing', () =>{
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <TopNav />
    </BrowserRouter>,div);
  ReactDOM.unmountComponentAtNode(div);
});