import React from 'react';
import ReactDOM from 'react-dom';
import TipBox from './TipBox';
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <TipBox />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
