import React from 'react';
import SingleProject from "../SingleProject/SingleProject";

class MainPage extends React.Component {

    render() {
        return (
            <section className="main-grid">
                <aside className="sidebar"></aside>
                <main>
                    <section class="main-project-grid">
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