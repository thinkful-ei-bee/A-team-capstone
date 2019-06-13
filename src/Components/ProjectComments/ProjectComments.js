import React from 'react';

export default class ProjectComments extends React.Component {

    render() {
        return (
            <section id="project_comments">
                <header className="comments-header">
                    <div className="comments-header-grid">
                        <p>1 Comment</p>
                        <p>Comments on This Project</p>
                    </div>
                </header>
                <article className="project-comment">
                    <h3>Collaborator Name Goes Here...</h3>
                    <p>t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum</p>
                    <span><small>Posted On: </small></span><small>July 13 2019</small>
                </article>
            </section>
        )
    }
}