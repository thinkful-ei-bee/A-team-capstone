import React from 'react';
import ReactDOM from 'react-dom';
import Registration from './Registration';
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Registration />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});