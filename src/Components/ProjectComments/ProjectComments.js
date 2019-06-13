import React from 'react';
import CommentsApiService from '../../services/comments-api-service';

export default class ProjectComments extends React.Component {
    state={
      comments: []
    }

    getComments(){
      CommentsApiService.getComments(this.props.project_id)
        .then(comments=>{
          this.setState({
            comments
          })
        })
    }

    componentDidMount(){
      this.getComments();
    }

    componentDidUpdate(){
      if (this.props.updateComments){
        this.getComments();
        this.props.setUpdateComments();
      }
    }


    render() {
      const commentsList = [];
      this.state.comments.forEach(comment=>{
        commentsList.push(
          <article className="project-comment" key={comment.id}>
            <h3>{comment.author_id}</h3>
            <p>{comment.content}</p>
            <strong>{comment.date_created}</strong>
          </article>
        )
      })
        return (
            <section id="project_comments">
                <header className="comments-header">
                    <div className="comments-header-grid">
                        <p>{commentsList.length} {commentsList.length !== 1 ? 'Comments' : 'Comment'}</p>
                        <p>Comments on This Project</p>
                    </div>
                </header>
                {commentsList}
            </section>
        )
    }
}