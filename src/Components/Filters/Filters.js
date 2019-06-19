import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
export default class Filters extends React.Component {

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

    render() {
        const search = <FontAwesomeIcon icon={faSearch} className="" />
        return (
            <section className="filter-box">
                <div className="filter-grid-item">
                    <form id="filter_search" onSubmit={this.handleSubmit}>
                        <label htmlFor="search"></label>
                        <input className="search_input" type="text" aria-label='search' name="searchTerm" placeholder="Search" value={this.state.searchTerm} onChange={(e) => this.changeFields(e)} />
                        <button id="searchBtn">{search}</button>
                    </form>
                </div>

                

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