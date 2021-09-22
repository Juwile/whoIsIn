import React, {Component} from 'react';
import { graphql } from 'react-apollo'; // helps getting query into component
import {
    getProjectQuery,
    deleteProjectMutation,
    getProjectsQuery
} from "../../queries/queries";
import flowright from "lodash.flowright";
import {format, parseISO} from "date-fns";

class ProjectDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { // initial state
            showBox: false
        }

    }


    displayProjectDetails(){
        const { project } = this.props.data // would be the same as const project = this.props.data.project
        if (project){ // if true then
            return (
                <div>
                    <h2>{project.title}</h2>
                    <p>Loaction: {project.location}</p>
                    <p>Date:  {format(parseISO(project.created),'dd.MM.yyyy')}</p>
                    <p>Time: {project.time}</p>
                    <p>Description: {project.description}</p>
                    <p>Participants: {project.owner.firstname}</p>
                    <a href="/edit-project"><button>Edit Event</button></a>
                    <button ref="#" onClick={(event) => {this.deleteProject(project.id); this.setState( () => ({showBox: true}))}}>Delete Event</button>
                </div>
            )
        } else {
            return (
                <div className="placeholder">
                    <h2>Event Details</h2>
                    <p>Please select event</p>
                </div>
            )
        }
    }

    deleteProject(currentId) {
        this.props.deleteProjectMutation({
            variables: {
                id: currentId,
            },
            refetchQueries:[{ // Updates project list
                query: getProjectsQuery
            }]
        });
    }

    displayConfirmationBox(){
        setTimeout(() => (
            this.setState( () => ({
                showBox: false
            }))),3000);
        return(
            <div className="confirmation-box-white">
                <p>Project deleted &#10004;</p>
            </div>
        )
    }

    render() {
        //console.log("this.props in render function", this.props); // this.props von projectList selected hierhin vererbt

        return (
            <div className="details box-styling">
                <div>
                    { this.state.showBox ? this.displayConfirmationBox() : null }
                </div>
                <div>{this.displayProjectDetails()}</div>
            </div>
        );
    }
}


export default flowright(
    graphql(getProjectQuery, {
        options: (props) => { // whenever props updates the variable id will be newly set
            return {
                variables: {
                    id: props.projectId
                }
            }
        }
    }),
    graphql(deleteProjectMutation,{name: "deleteProjectMutation"})
)(ProjectDetail);
