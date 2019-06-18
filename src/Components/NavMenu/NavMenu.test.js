import React from 'react';
import ReactDOM from 'react-dom';
import NavMenu from './NavMenu';
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NavMenu />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
