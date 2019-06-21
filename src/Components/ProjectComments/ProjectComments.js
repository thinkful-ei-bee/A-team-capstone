import React from 'react';
import moment from 'moment';
import config from '../../config';
import TokenService from '../../services/token-service';

export default class ProjectComments extends React.Component {
    state={
      connection: {}
    }

    createConnection(id) {
      const ws = new WebSocket(config.WS_ENDPOINT + `/${id}/?token=${TokenService.getAuthToken()}`);
        
        ws.onmessage = function(e) {
          if (Number(e.data) === id) {
            this.props.getComments();
          }
        }

        ws.onmessage = ws.onmessage.bind(this);

        this.setState({
          connection: ws
        });
    }

    componentDidMount(){
      this.createConnection(this.props.project_id);
    }

    componentWillUnmount() {
      if (this.state.connection.close) {
        this.state.connection.close();
      }
    }

    componentWillReceiveProps() {
      this.createConnection(this.props.project_id);
    }

    render() {
      const commentsList = [];
      this.props.comments.forEach(comment=>{
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