import React, {Component} from 'react';
import { graphql } from 'react-apollo'; // helps getting query into component
import {getSprintsQuery} from "../../queries/queries";
import DashboardDetail from "./DashboardDetail";



class Dashboard extends Component {
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
            <div className="main dashboard">
                <h1>Dashboard</h1>
                <div className="content box-styling dashboard-boxes">
                    <h2>Sprints</h2>
                    <ul className="list">
                        { this.displaySprints() }
                    </ul>
                </div>
                <DashboardDetail sprintId={this.state.selected}/>
            </div>
        );
    }
}

export default graphql(getSprintsQuery)(Dashboard); // inside ProjectList we have access to data from query via this.props
