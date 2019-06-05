import React from 'react';
import SingleProject from "../SingleProject/SingleProject";
import Filters from "../Filters/Filters";
import SideBar from "../SideBar/SideBar";
import ProjectApiService from '../../services/project-api-service';

class MainPage extends React.Component {

    state = {
        projects: []
    }

    componentDidMount() {
        return ProjectApiService.getAllProjects()
            .then(projects => {
                projects.forEach(project => { project.open = false });
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
                    <Filters></Filters>
                    <section className="main-project-grid">
                        {projects.map((project, i) => <SingleProject key={i} classname="btn" project={project}></SingleProject>)}
                    </section>
                </main>
            </section>
        )
    }
}

export default MainPage