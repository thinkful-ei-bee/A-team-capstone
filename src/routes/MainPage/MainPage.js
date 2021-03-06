import React from 'react';
import { Redirect } from 'react-router-dom';
import SingleProject from "../../Components/SingleProject/SingleProject";
import Filters from "../../Components/Filters/Filters";
import SideBar from "../../Components/SideBar/SideBar";
import ProjectApiService from '../../services/project-api-service';
import TokenService from '../../services/token-service';
import Footer from '../../Components/Footer/Footer';

class MainPage extends React.Component {

    state = {
        projects: [],
        searchTerm: '',
        language: '',
        searching: false,
        updateBids: false,
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

    updateBids = () => {
        this.setState({
            updateBids: !this.state.updateBids
        })
    }

    componentDidUpdate() {
        if (this.state.searching && TokenService.hasAuthToken()) {
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
        if (TokenService.hasAuthToken()) {
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

    render() {
        const projects = this.state.projects;
        if (!TokenService.hasAuthToken()) {
            return <Redirect to='/landing' />
        }

        return (
            <React.Fragment>
                <section className="main-grid">
                    <SideBar setUpdateBids={this.updateBids} updateBids={this.state.updateBids}></SideBar>
                    <section>
                        <Filters setSearch={this.setSearch}></Filters>
                        <div className="mbl-separator">
                            <h5>PROJECTS</h5>
                            <hr />
                        </div>
                        <section className="main-project-grid">
                            {projects.map((project, i) => <SingleProject key={project.id} classname="btn" project={project} onClick={() => this.alternateOpen(i)} renderLink updateBids={this.updateBids}></SingleProject>)}
                        </section>
                    </section>

                </section>
                <Footer></Footer>
            </React.Fragment>
        )
    }
}

export default MainPage