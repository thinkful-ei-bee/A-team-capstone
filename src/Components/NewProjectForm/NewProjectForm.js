import React from 'react';
import ProjectApiService from '../../services/project-api-service';

export default class NewProjectForm extends React.Component {
  
    state = {
        name: '',
        description: '',
        error: null
      }
    
      cancel = () => {
        this.props.history.goBack();
      }
    
      save = (event) => {
        event.preventDefault();
        return ProjectApiService.submitProject({
          project_name: this.state.name,
          project_description: this.state.description
        });
      }
    
      changeFields(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }

  render() {
    let error = this.state.error
    return (
        <section className="section ">
            <div className="section-grid-item">
                <h2>New Project</h2>
                <form id="new-project-form" onSubmit={this.save}>
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <div className='project-name'>
                        <label htmlFor='new-project-name'>Username</label>
                            <input
                                name='name'
                                type='text'
                                required
                                id='new-project-name'
                                placeholder="Project Name (Required)"
                                className="text">
                            </input>
                        </div>
                    <div className='project-description'>
                        <label htmlFor='new-project-description'>Project Description</label>
                            <textarea
                                name='description'
                                id='new-project-description'
                                type='text'
                                required
                                className="text">
                            </textarea>
                    </div>
                            
                    <button className="btn submit_btn" type='submit'>
                        Submit Project
                     </button>
                 </form>
            </div>
        </section>
    );
  }

}