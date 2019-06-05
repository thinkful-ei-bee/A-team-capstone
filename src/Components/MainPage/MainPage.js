import React from 'react';
import SingleProject from "../SingleProject/SingleProject";
import Filters from "../Filters/Filters";
import SideBar from "../SideBar/SideBar";
import ProjectApiService from '../../services/project-api-service';

class MainPage extends React.Component {

    state = {
        projects: [],
        searchTerm: '',
        language: '',
        searching: false
    }

    setSearch = (term, language) => {
        this.setState({
            searchTerm: term,
            language: language,
            searching: true
        });
    }

    searchChecksOut(project, term, language) {
        let langToSearch = '';
        if (project.languages) {
            langToSearch = project.languages.toLowerCase();
        }
        
        const descToSearch = project.project_description.toLowerCase();
        const nameToSearch = project.project_name.toLowerCase();
        const lowerTerm = term.toLowerCase();
        const lowerLang = language.toLowerCase();

        if (langToSearch.indexOf(lowerLang) === -1) {
            return false;
        }

        if (descToSearch.indexOf(lowerTerm) === -1 && nameToSearch.indexOf(lowerTerm) === -1) {
            return false;
        }
        return true;
    }

    alternateOpen = (i) => {
        const replacement = [...this.state.projects];
        replacement[i].open = !replacement[i].open;
        this.setState({
            projects: replacement
        })
    }

    componentDidUpdate() {
        if (this.state.searching) {
            this.setState({
                searching: false
            })

            ProjectApiService.getAllProjects()
            .then(projects => {
                projects.forEach(project => { project.open = false });
                const filteredProjects = projects.filter(project => this.searchChecksOut(project, this.state.searchTerm, this.state.language));
                this.setState({
                    projects: filteredProjects
                });
            })
        }
    }

    componentDidMount() {
        ProjectApiService.getAllProjects()
            .then(projects => {
                projects.forEach(project => { project.open = false });
                const filteredProjects = projects.filter(project => this.searchChecksOut(project, this.state.searchTerm, this.state.language));
                this.setState({
                    projects: filteredProjects
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