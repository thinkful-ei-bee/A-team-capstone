import React from 'react';
import ReactDOM from 'react-dom';
import ProjectComments from './ProjectComments';
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ProjectComments />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});