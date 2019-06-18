import React from 'react';
import ReactDOM from 'react-dom';
import NewProjectForm from './NewProjectForm';
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NewProjectForm />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
