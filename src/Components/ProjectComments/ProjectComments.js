import React from 'react';
import CommentsApiService from '../../services/comments-api-service';
import moment from 'moment';
import config from '../../config';
import TokenService from '../../services/token-service';

export default class ProjectComments extends React.Component {
    state={
      comments: [],
      connection: {}
    }

    getComments(){
      CommentsApiService.getComments(this.props.project_id)
        .then(comments=>{
          this.setState({
            comments
          })
        })
    }

    createConnection(id) {
      const ws = new WebSocket(config.WS_ENDPOINT + `/${id}/?token=${TokenService.getAuthToken()}`);
  
        ws.onopen = () => {
          ws.send('opened ws connection!');
        }
  
        ws.onmessage = function(e) {
          console.log('Server said: ' + e.data);
        }

        this.setState({
          connection: ws
        });
    }

    componentDidMount(){
      console.log('comments mounted');
      this.getComments();
      this.createConnection(this.props.project_id);
    }

    componentDidUpdate(){
      if (this.props.updateComments){
        this.getComments();
        this.props.setUpdateComments();
      }
    }

    componentWillUnmount() {
      if (this.state.connection.close) {
        this.state.connection.close();
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