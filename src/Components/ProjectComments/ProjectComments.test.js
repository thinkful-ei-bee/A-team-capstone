import React from 'react';
import ReactDOM from 'react-dom';
import ProjectComments from './ProjectComments';
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  const comments = [
    {author_id:9,
    content:"testing if it is still okay",
    date_created:"2019-06-20T21:49:59.970Z",
    id:47,
    project_id:5,
    username:"eb",
    }]
  ReactDOM.render(
    <BrowserRouter>
      <ProjectComments comments={comments}/>
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});