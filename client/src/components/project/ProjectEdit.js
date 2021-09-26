import React, {Component} from 'react';
import { graphql } from 'react-apollo'; // helps getting query into component. Compose in order that multiple queries can be binded at bottom.
import flowright from 'lodash.flowright'; // instead of compose. compose no longer existing
import {
    getProfilesQuery,
    addProjectMutation,
    getProjectsQuery,
    updateProjectMutation
} from "../../queries/queries";
import DatePicker from "react-datepicker";

class UpdateProject extends Component {
    constructor(props) {
        super(props);
        this.state = { // initial state
            id:'',
            title:'',
            location:'',
            date:new Date(),
            time:'',
            description:'',
            link:'',
            profileId:'',
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
                location: this.state.location,
                date: this.state.created,
                time: this.state.time,
                description: this.state.description,
                profileId: this.state.profileId,
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
                <h2>Edit event</h2>
                <form id="update-project" onSubmit={ this.submitForm.bind(this) }>
                    <div className="field">
                        <label>Event to edit</label>
                        <select onChange={ (e) => this.setState({ id:e.target.value})}>
                            <option>Select event</option>
                            { this.displayProjects() }
                        </select>
                    </div>
                    <div className="field">
                        <label>Event title:</label>
                        <input type="text" onChange={ (e) => this.setState({ title:e.target.value})} />
                    </div>
                    <div className="field">
                        <label>Location:</label>
                        <input type="text" onChange={ (e) => this.setState({ location:e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Date</label>
                        <div className="form-input">
                            {this.datePicker()}
                        </div>
                    </div>
                    <div className="field">
                        <label>Participants</label>
                        <select onChange={ (e) => this.setState({ profileId:e.target.value})}>
                            <option>Select Participants</option>
                            { this.displayProfiles() }
                        </select>
                    </div>
                    <div className="field">
                        <button>Update event</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default flowright(
    graphql(getProfilesQuery, {name: "getProfilesQuery"}),
    graphql(getProjectsQuery, {name: "getProjectsQuery"}),
    graphql(addProjectMutation, {name: "addProjectMutation"}),
    graphql(updateProjectMutation, {name: "updateProjectMutation"}),//
)(UpdateProject); // inside AddProject we have access to data from query via this.props
