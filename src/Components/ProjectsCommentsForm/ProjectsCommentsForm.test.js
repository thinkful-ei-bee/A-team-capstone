import React from 'react';
import ReactDOM from 'react-dom';
import ProjectsCommentsForm from './ProjectsCommentsForm';
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ProjectsCommentsForm />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
