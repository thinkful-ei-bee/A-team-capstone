import React from 'react';
import ReactDOM from 'react-dom';
import Bidder from './Bidder';
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Bidder bidder={{}} />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
