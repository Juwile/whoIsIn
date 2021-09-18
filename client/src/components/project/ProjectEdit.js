import React, {Component} from 'react';
import { graphql } from 'react-apollo'; // helps getting query into component. Compose in order that multiple queries can be binded at bottom.
import flowright from 'lodash.flowright'; // instead of compose. compose no longer existing
import {
    getProfilesQuery,
    addProjectMutation,
    getProjectsQuery,
    getSprintsQuery,
    updateProjectMutation
} from "../../queries/queries";
import DatePicker from "react-datepicker";

class UpdateProject extends Component {
    constructor(props) {
        super(props);
        this.state = { // initial state
            id:'',
            title:'',
            status:'',
            effort:'',
            created:new Date(),
            due:new Date(),
            profileId:'',
            sprintId:''
        }
    }


    displayProfiles(){
        var data = this.props.getProfilesQuery;
        if(data.loading){
            return(<option disabled>Loading profiles</option>)
        } else{
            return data.profiles.map(profile => {
                return(<option key={profile.id} value={profile.id}>{profile.firstname}</option>)
            })
        }
    }

    displaySprints(){
        var data = this.props.getSprintsQuery;
        if(data.loading){
            return(<option disabled>Loading sprints</option>)
        } else{
            return data.sprints.map(sprint => {
                return(<option key={sprint.id} value={sprint.id}>{sprint.number}</option>)
            })
        }
    }

    displaySprintsInCheckbox(){
        var data = this.props.getSprintsQuery;

        if(data.loading){
            return(<option disabled>Loading sprints</option>)
        } else{
            return data.sprints.map(sprint => {
                return(
                    <div>
                        <input name="checkboxes" type="checkbox" key={sprint.id} id={sprint.id} value={sprint.id} onChange={ (e) => this.setState({ sprintId: this.getCheckedBoxes()})}/>
                        <label htmlFor={sprint.id}>{sprint.number}</label>
                    </div>
                )
            })
        }
    }

    // Date Picker
    handleChangeStart = date => {
        this.setState({
            created: date
        });
    };


    handleChangeEnd = date => {
        this.setState({
            due: date
        });
    };

    datePicker(){
        return (
            <div>
                <DatePicker
                    selected={this.state.created}
                    onChange={this.handleChangeStart}
                    selectsStart
                />
                <DatePicker
                    selected={this.state.due}
                    onChange={this.handleChangeEnd}
                    selectsEnd
                    startDate={this.state.created}
                    endDate={this.state.due}
                    minDate={this.state.created}
                />
            </div>
        );
    }

    getCheckedBoxes() {
        const checkboxes = document.getElementsByName("checkboxes");
        const checkboxesChecked = [];
        // loop over them all
        for (var i=0; i<checkboxes.length; i++) {
            // And stick the checked ones onto an array...
            if (checkboxes[i].checked) {
                checkboxesChecked.push(checkboxes[i].id);
            }
        }
        // Return the array if it is non-empty, or null
        return checkboxesChecked.length > 0 ? checkboxesChecked : null;
    }

    submitForm(e){
        e.preventDefault();
        this.props.updateProjectMutation({
            variables: {
                id: this.state.id,
                title: this.state.title,
                status: this.state.status,
                effort: parseInt(this.state.effort),
                created: this.state.created,
                due: this.state.due,
                profileId: this.state.profileId,
                sprintId: this.state.sprintId
            }
        }); // addProjectMutation defined at bottom
    }

    displayProjects(){
        var data = this.props.getProjectsQuery;
        if(data.loading){
            return(<option disabled>Loading projects</option>)
        } else{
            return data.projects.map(project => {
                return(<option key={project.id} value={project.id}>{project.title}</option>)
            })
        }
    }


    render() {
        return (
            <div className="box-styling update dashboard">
                <h2>Edit project</h2>
                <form id="update-project" onSubmit={ this.submitForm.bind(this) }>
                    <div className="field">
                        <label>Project to edit</label>
                        <select onChange={ (e) => this.setState({ id:e.target.value})}>
                            <option>Select Project</option>
                            { this.displayProjects() }
                        </select>
                    </div>
                    <div className="field">
                        <label>Project title:</label>
                        <input type="text" onChange={ (e) => this.setState({ title:e.target.value})} />
                    </div>
                    <div className="field">
                        <label>Status:</label>
                        <input type="text" onChange={ (e) => this.setState({ status:e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Effort:</label>
                        <input type="number" onChange={ (e) => this.setState({ effort:e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Project duration</label>
                        <div className="form-input">
                            {this.datePicker()}
                        </div>
                    </div>
                    <div className="field">
                        <label>Project Leader:</label>
                        <select onChange={ (e) => this.setState({ profileId:e.target.value})}>
                            <option>Select Project Leader</option>
                            { this.displayProfiles() }
                        </select>
                    </div>
                    <div className="field">
                        <label>In sprint:</label>
                        <div className="checkboxes form-input">
                            { this.displaySprintsInCheckbox() }
                        </div>
                    </div>
                    <div className="field">
                        <button>Update project</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default flowright(
    graphql(getProfilesQuery, {name: "getProfilesQuery"}),
    graphql(getProjectsQuery, {name: "getProjectsQuery"}),
    graphql(getSprintsQuery, {name: "getSprintsQuery"}),// name used in display profiles
    graphql(addProjectMutation, {name: "addProjectMutation"}),
    graphql(updateProjectMutation, {name: "updateProjectMutation"}),//
)(UpdateProject); // inside AddProject we have access to data from query via this.props
