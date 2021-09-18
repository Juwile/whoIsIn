import React, {Component} from 'react';
import { graphql } from 'react-apollo'; // helps getting query into component
import {getSprintsQuery} from "../../queries/queries";
import SprintDetail from "./SprintDetail";
import AddSprint from "./AddSprint";
import ChatComponent from "../ChatComponent"; // at the bottom query is related to component


class SprintList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null // keeps track off which book is clicked on (for eventlistener onclick)
        }
    }

    displaySprints(){
        var data = this.props.data; // data property from props which is returned
        if(data.loading){
            return(<div>Loading sprints...</div>);
        }else {
            return data.sprints.map(sprint => { //map iterates through all projects
                return(
                    <li key={sprint.id} onClick={ (e) => {this.setState({selected: sprint.id})}}>{sprint.number}</li>
                );
            })
        }
    }

    render() {
        return (
            <div className="main detailpage">
                <div className="content box-styling">
                    <h1>Sprint Overview</h1>
                    <ul className="list">
                    { this.displaySprints() }
                    </ul>
                </div>
                <AddSprint />
                <SprintDetail sprintId={this.state.selected}/>
                <ChatComponent />
            </div>
        );
    }
}

export default graphql(getSprintsQuery)(SprintList); // inside ProjectList we have access to data from query via this.props
