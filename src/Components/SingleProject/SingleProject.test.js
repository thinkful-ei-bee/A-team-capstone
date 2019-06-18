import React from 'react';
import ReactDOM from 'react-dom';
import SingleProject from './SingleProject';
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SingleProject project={ {
        project_name: 'abc'
      } } />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
