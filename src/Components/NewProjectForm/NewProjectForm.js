import React from 'react';
import ProjectApiService from '../../services/project-api-service';

export default class NewProjectForm extends React.Component {
  
    state = {
        name: '',
        description: '',
        languages: '',
        requirements: '',
        deadline: '',
        openPositions: 1,
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

        ProjectApiService.submitProject({
          project_name: this.state.name,
          project_description: this.state.description,
          languages: this.state.languages,
          requirements: this.state.requirements,
          deadline: this.state.deadline,
          openPositions: this.state.openPositions,
        }).then(() => {
          this.props.history.push('/');       
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
        <section className="section">
            <div className="section-grid-item">
                <h2>New Project</h2>
                <form id="new-project-form" onSubmit={this.save}>
                  <div className="form-top">
                    <p>CREATE</p>
                  </div>
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <div className='project-name'>
                        <label htmlFor='new-project-name'></label>
                        <input
                            value={this.state.name}
                            onChange={e => this.changeFields(e)}
                            name='name'
                            type='text'
                            id='new-project-name'
                            aria-label='new-project-name'
                            aria-required='true'
                            placeholder='Project Name (Required)'
                            className="text">
                        </input>
                    </div>
                    <div className='project-description'>
                        <label htmlFor='new-project-description'></label>
                        <textarea
                            value={this.state.description}
                            onChange={e => this.changeFields(e)}
                            name='description'
                            id='new-project-description'
                            aria-label='new-project-description'
                            aria-required='true'
                            type='text'
                            placeholder='Project Description (Required)'
                            className="text">
                        </textarea>
                    </div>
                    <div className='project-languages'>
                        <label htmlFor='new-project-languages'></label>
                        <input
                            value={this.state.languages}
                            onChange={e => this.changeFields(e)}
                            name='languages'
                            id='new-project-languages'
                            aria-label='new-project-languages'
                            type='text'
                            placeholder='e.g. Ruby, Python'
                            className="text">
                        </input>
                    </div>
                    <div className='project-requirements'>
                        <label htmlFor='new-project-requirements'></label>
                        <input
                          value={this.state.requirements}
                          onChange={e => this.changeFields(e)}
                          name='requirements'
                          id='new-project-requirements'
                          aria-label='new-project-requirements'
                          aria-required='true'
                          type='text'
                          placeholder='e.g. experience in full stack development'
                          className="text">
                        </input>
                    </div>
                    <div className='project-deadline'>
                        <label htmlFor='new-project-deadline'></label>
                        <input
                          value={this.state.deadline}
                          onChange={e => this.changeFields(e)}
                          name='deadline'
                          id='new-project-deadline'
                          aria-label='new-project-deadline'
                          type='date'
                          className="text">
                        </input>
                    </div>
                    <div className='open-positions'>
                        <label htmlFor='new-project-positions'></label>
                        <input
                          value={this.state.openPositions}
                          onChange={e => this.changeFields(e)}
                          name='openPositions'
                          id='new-project-positions'
                          aria-label='new-project-positions'
                          type='number'
                          className="text">
                        </input>
                    </div>
                    <button className="btn submit_btn" type='submit' onClick={this.save}>
                        SUBMIT
                     </button>
                     <button className="btn btn-cancel" onClick={this.cancel}>Cancel</button>
                 </form>
            </div>
        </section>
    );
  }

}