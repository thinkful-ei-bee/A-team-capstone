import React from 'react';
import ReactDOM from 'react-dom';
import Filters from './Filters';
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Filters />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});