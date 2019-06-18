import React from 'react';
import ReactDOM from 'react-dom';
import SideBar from './SideBar';
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SideBar />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
