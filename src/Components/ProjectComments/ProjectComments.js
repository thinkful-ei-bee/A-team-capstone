import React from 'react';
import CommentsApiService from '../../services/comments-api-service';
import moment from 'moment';

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
        const time = comment.date_created;
        const formattedTime = time.slice(0, 10) + ' ' + time.slice(11, 19) + ' +0000';
        commentsList.push(
          <article className="project-comment" key={comment.id}>
            <h3>{comment.username}</h3>
            <p>{comment.content}</p>
            <small>{moment(formattedTime, 'YYYY-MM-DD HH:mm:ss Z').local().format('MM-DD-YYYY HH:mm:ss')}</small>
            <hr></hr>
            <p>{comment.content}</p>
          </article>
        )
      })
        return (
            <section id="project_comments">
                
                {commentsList}
            </section>
        )
    }
}