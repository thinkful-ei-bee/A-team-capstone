import React from 'react';

export default class Filters extends React.Component{

    state = {
        searchTerm: '',
        language: ''
    }

    changeSelection(event) {
        this.setState({
            language: event.target.value
        });
    }

    changeFields(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.setSearch(this.state.searchTerm, this.state.language);
    }

    render(){
        return (
            <section className="filter-box">
                        <form id="filter_search" onSubmit={(e) => this.handleSubmit(e)}>
                            <input className="search_input" type="text" name="searchTerm" placeholder="Search" value={this.state.searchTerm} onChange={(e) => this.changeFields(e)}/>
                            <button>Submit</button>
                        </form>
                        <select className="spec_filter" value={this.state.language} onChange={(e) => this.changeSelection(e)}>
                            <option name="language" value="">No Filter</option>
                            <option name="language" value="HTML">HTML</option>
                            <option name="language" value="CSS">CSS</option>
                            <option name="language" value="JavaScript">JavaScript</option>
                        </select>
                        {/* not implementing this filter for now
                        
                            <select className="spec_filter">
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Very Experienced">Very Experienced</option>
                            <option value="Expert/Senior">Expert/Senior</option>
                        </select> */}
                    </section>
        )
    }
}