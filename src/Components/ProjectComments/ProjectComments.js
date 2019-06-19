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
        .then(comments => {

          comments = comments.sort((comment1, comment2) => {
            if (comment1.date_created > comment2.date_created) { 
              return -1; 
            } else {
              return 1;
            }
          });

          this.setState({
            comments
          })
        })
    }

    createConnection(id) {
      const ws = new WebSocket(config.WS_ENDPOINT + `/${id}/?token=${TokenService.getAuthToken()}`);
        
        ws.onmessage = function(e) {
          if (Number(e.data) === id) {
            this.getComments();
          }
        }

        ws.onmessage = ws.onmessage.bind(this);

        this.setState({
          connection: ws
        });
    }

    componentDidMount(){
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

    componentWillReceiveProps() {
      // if (this.state.connection.close) {
      //   this.state.connection.close();
      // }

      this.getComments();
      this.createConnection(this.props.project_id);
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