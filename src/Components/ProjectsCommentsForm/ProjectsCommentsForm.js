import React from 'react';
import CommentsApiService from '../../services/comments-api-service';


export default class ProjectsCommentsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            comment: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // invoked after form inputs are validated
    handleSubmit = ev => {

        ev.preventDefault();

        // updates state.error
        this.setState({ error: null });

        //deconstruct form values into variables
        const { comments } = ev.target;
        // A fetch call is made to the server from this method @ line 4/AuthApiService.js to /auth/login endpoint in the server
        const userComment = { content: this.state.comment }
        CommentsApiService.postComment(this.props.project_id, userComment)
            .then(res => {
                comments.value='';
            })
            .catch(res => {
                this.setState({ error: res.error });
            })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <React.Fragment>
                <section id="comments-section" className="section">

                    <div>
                        {/* <div className="mbl-separator" style={{padding: "0", marginRight: "10px", marginBottom: "35px"}}>
                            <h2>COMMENTS:</h2>
                            <hr />
                        </div> */}
                        <header className="comments-header">
                            <div className="comments-header-grid">
                                {/* <p>{commentsList.length} {commentsList.length !== 1 ? 'Comments' : 'Comment'}</p> */}
                                <h2>PROJECT COMMENTS</h2>
                            </div>
                        </header>
                        <form id="comments-form"
                            onSubmit={(ev) => this.props.handleCommentSubmit(ev, this.state.comment)}>
                            {/* <div className="form-top" style={{ textAlign: "center" }}>
                                <p>COMMENT</p>
                            </div> */}
                            <div className="form-body">
                                <div role='alert'>
                                    {/* {error && <p className='red'>{error}</p>} */}
                                </div>

                                <div className='password'>
                                    <label htmlFor='comments_text'>Leave Your Comments Here</label>
                                    <textarea
                                        name='comment'
                                        type='text'
                                        id="comments_text"
                                        required
                                        placeholder="Type A Comment"
                                        className="text"
                                        // value={this.state.comment}
                                        onChange={(ev) => this.handleChange(ev)}
                                    >
                                    </textarea>
                                </div>
                                <button className="btn submit_btn" type='submit'>
                                    SUBMIT
                            </button>
                            </div>

                        </form>
                    </div>
                </section>
            </React.Fragment >
        )
    }
}