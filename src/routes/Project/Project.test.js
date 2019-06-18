import React from 'react';
import ReactDOM from 'react-dom';
import Project from './Project';
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <Project match={{params:1}}/>
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});