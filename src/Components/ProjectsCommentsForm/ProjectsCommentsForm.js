import React from 'react';

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
        const { comment } = ev.target;
        // A fetch call is made to the server from this method @ line 4/AuthApiService.js to /auth/login endpoint in the server
        // ProjectCommentApiService.postComment({
        //     comment: comment.value
        // })

            // form values are cleared, token is saved 
            // .then(res => {
            //     comment.value = '';
            // })

            // updates form state.error if login fails
            // .catch(res => {
            //     this.setState({ error: res.error });
            // });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <React.Fragment>
                <section className="section comment-grid">
                    {/* spacer */}
                    <div className="section-grid-item"></div>
                    <div className="section-grid-item">
                        <h2>Leave A Comment</h2>
                        <form id="comments-form"
                            onSubmit={this.handleSubmit}>
                                <div className="form-top">
                                    <p>Comment</p>
                                </div>
                                <div className="form-body">
                                <div role='alert'>
                                {/* {error && <p className='red'>{error}</p>} */}
                            </div>
                            
                            <div className='password'>
                                <label htmlFor='comments_text'>Leave Your Comments Here</label>
                                <textarea
                                    name='comments'
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