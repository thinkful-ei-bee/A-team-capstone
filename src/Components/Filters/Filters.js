import React from 'react';

export default class Filters extends React.Component{

    render(){
        return (
            <section className="filter-box">
                        <form id="filter_search" action="" method="post">
                            <input className="search_input" type="email" name="email" placeholder="Search" />
                            <button>Submit</button>
                        </form>
                        <select className="spec_filter">
                            <option value="HTML">HTML</option>
                            <option value="CSS">CSS</option>
                            <option value="Javascript">Javascript</option>
                        </select>
                        <select className="spec_filter">
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Very Experienced">Very Experienced</option>
                            <option value="Expert/Senior">Expert/Senior</option>
                        </select>
                    </section>
        )
    }
}