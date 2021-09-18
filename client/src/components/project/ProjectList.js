import React, {Component} from 'react';
import { graphql } from 'react-apollo'; // helps getting query into component
import { getProjectsQuery } from "../../queries/queries"; // at the bottom query is related to component

// components
import AddProject from "./AddProject";
import ProjectDetail from "./ProjectDetail";
import ChatComponent from "../ChatComponent";


class ProjectList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null // keeps track off which book is clicked on (for eventlistener onclick)
        }
    }


    displayProjects(){
        var data = this.props.data; // data property from props which is returned
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
                <div className="content box-styling">
                    <h1>Project Overview</h1>
                    <ul className="list">
                        { this.displayProjects() }
                    </ul>
                </div>
                <AddProject />
                <ProjectDetail projectId={this.state.selected}/>
                <ChatComponent />
            </div>
        );
    }
}

export default graphql(getProjectsQuery)(ProjectList); // inside ProjectList we have access to data from query via this.props
