import React, {Component} from 'react';
import { graphql } from 'react-apollo'; // helps getting query into component
import { getProjectsQuery } from "../../queries/queries"; // at the bottom query is related to component

// components
import ProjectDetail from "./ProjectDetail";



class ProjectList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null // keeps track off which book is clicked on (for eventlistener onclick)
        }
    }


    displayProjects(){
        var data = this.props.data; // data property from props which is returned
        console.log(data.projects);
        if(data.loading){
            return(<div>Loading projects...</div>);
        }else {
            return data.projects.map(project => { //map iterates through all projects
                return(
                    <li key={project.id} onClick={ (e) => {this.setState({selected: project.id})}}>{project.title}</li>
                    // vererbt Props in render function,
                    // wo es von projectId aufgegriffen wird und an ProjectDetails als Props vererbt wird
                );
            })
        }
    }

    render() {
        return (
            <div className="main detailpage">
                <div className="content">
                    <h1>Event Overview</h1>
                    <ul className="list">
                        { this.displayProjects() }
                    </ul>

                </div>
                <ProjectDetail projectId={this.state.selected}/>
            </div>
        );
    }
}

export default graphql(getProjectsQuery)(ProjectList); // inside ProjectList we have access to data from query via this.props
