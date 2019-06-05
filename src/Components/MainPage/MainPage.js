import React from 'react';
import SingleProject from "../SingleProject/SingleProject";
import Filters from "../Filters/Filters";
import SideBar from "../SideBar/SideBar";
import ProjectApiService from '../../services/project-api-service';

class MainPage extends React.Component {

    state = {
        projects: [],
        searchTerm: '',
        language: ''
    }

    setSearch(term, language) {
        this.setState({
            searchTerm: term,
            language: language
        });
    }

    alternateOpen = (i) => {
        const replacement = [...this.state.projects];
        replacement[i].open = !replacement[i].open;
        this.setState({
            projects: replacement
        })
    }

    componentDidMount() {
        ProjectApiService.getAllProjects()
            .then(projects => {
                projects.forEach(project => { project.open = false });
                const filteredProjects = projects.filter(project => (project.project_description.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1 || project.project_name.toLowerCase().indexOf(this.state.searchTerm) !== -1) && )
                this.setState({
                    projects: projects
                });
            })
    }

    render() {
        const projects = this.state.projects;
        return (
            <section className="main-grid">
                <SideBar></SideBar>
                <main>
                    <Filters setSearch={this.setSearch}></Filters>
                    <section className="main-project-grid">
                        {projects.map((project, i) => <SingleProject key={i} classname="btn" project={project} onClick={() => this.alternateOpen(i)}></SingleProject>)}
                    </section>
                </main>
            </section>
        )
    }
}

export default MainPage