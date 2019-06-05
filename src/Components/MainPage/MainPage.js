import React from 'react';
import SingleProject from "../SingleProject/SingleProject";
import Filters from "../Filters/Filters";
import SideBar from "../SideBar/SideBar";

class MainPage extends React.Component {

    render() {
        return (
            <section className="main-grid">
                <SideBar></SideBar>
                <main>
                    <Filters></Filters>
                    <section className="main-project-grid">
                        <SingleProject classname="btn"></SingleProject>
                        <SingleProject classname="btn"></SingleProject>
                        <SingleProject classname="btn"></SingleProject>
                        <SingleProject classname="btn"></SingleProject>
                        <SingleProject classname="btn"></SingleProject>
                        <SingleProject classname="btn"></SingleProject>
                        <SingleProject classname="btn"></SingleProject>
                        <SingleProject classname="btn"></SingleProject>
                    </section>
                </main>
            </section>
        )
    }
}

export default MainPage