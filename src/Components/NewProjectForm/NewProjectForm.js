import React from 'react';
import ProjectApiService from '../../services/project-api-service';

export default class NewProjectForm extends React.Component {
  
    state = {
        name: '',
        description: '',
        error: null
      }
    
      cancel = (event) => {
        event.preventDefault();
        this.props.history.goBack();
      }
    
      save = (event) => {
        event.preventDefault();
        if (!this.state.name || !this.state.description) {
            return;
        }

        this.props.history.push('/');        

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
    let error = this.state.error;
    return (
        <section className="section ">
            <div className="section-grid-item">
                <h2>New Project</h2>
                <form id="new-project-form" onSubmit={this.save}>
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <div className='project-name'>
                        <label htmlFor='new-project-name'>Project Name</label>
                            <input
                                value={this.state.name}
                                onChange={e => this.changeFields(e)}
                                name='name'
                                type='text'
                                id='new-project-name'
                                placeholder="Project Name (Required)"
                                className="text">
                            </input>
                        </div>
                    <div className='project-description'>
                        <label htmlFor='new-project-description'>Project Description</label>
                            <textarea
                                valeu={this.state.description}
                                onChange={e => this.changeFields(e)}
                                name='description'
                                id='new-project-description'
                                type='text'
                                placeholder="Project Description (Required)"
                                className="text">
                            </textarea>
                    </div>
                            
                    <button className="btn submit_btn" type='submit' onClick={this.save}>
                        Submit Project
                     </button>
                     <button className="btn-cancel" onClick={this.cancel}>Cancel</button>
                 </form>
            </div>
        </section>
    );
  }

}