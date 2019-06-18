import React from 'react';
import ReactDOM from 'react-dom';
import HamburgerButton from './HamburgerButton';
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <HamburgerButton />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
