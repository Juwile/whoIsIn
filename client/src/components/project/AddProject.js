import React, {Component} from 'react';
import { graphql } from 'react-apollo'; // helps getting query into component. Compose in order that multiple queries can be binded at bottom.
import flowright from 'lodash.flowright'; // instead of compose. compose no longer existing
import {getProfilesQuery, addProjectMutation, getProjectsQuery} from "../../queries/queries";

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state = { // initial state
            title:'New Event',
            location:'',
            date:'',
            time:'',
            description: '',
            link:'',
            profileId:'',
            showBox: false
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
        this.props.addProjectMutation({
            variables: {
                title: this.state.title,
                location: this.state.location,
                date: this.state.date,
                time: this.state.time,
                description: this.state.description,
                link: this.state.link,
                profileId: this.state.profileId,
            },
            refetchQueries:[{ // Updates project list
                query: getProjectsQuery
            }]
        });// addProjectMutation defined at bottom
        const frm = document.getElementById('add-project');
        frm.reset();
    }

    displayConfirmationBox(){
        setTimeout(() => (
            this.setState( () => ({
                showBox: false
                }))),3000);
        return(
            <div className="confirmation-box">
                <p>Project Added &#10004;</p>
            </div>
        )
    }


    render() {
        return (
            <div className="form-content box-styling">
                <div>
                    { this.state.showBox ? this.displayConfirmationBox() : null }
                </div>
                <h2>Add new event</h2>
                <form id="add-project" onSubmit={ this.submitForm.bind(this) }>
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
                        <input name="absence" type="date" onChange={ (e) => this.setState({ date:e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Time:</label>
                        <input type="text" onChange={ (e) => this.setState({ time:e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Description:</label>
                        <input type="text" onChange={ (e) => this.setState({ description:e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Link:</label>
                        <input type="text" onChange={ (e) => this.setState({ link:e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Participants:</label>
                        <select onChange={ (e) => this.setState({ profileId:e.target.value})}>
                            <option>Select Participants</option>
                            { this.displayProfiles() }
                        </select>
                    </div>
                    <div className="field">
                        <button onClick={ () => this.setState( () => ({showBox: true}))}>Add event</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default flowright(
    graphql(getProfilesQuery, {name: "getProfilesQuery"}),
    graphql(addProjectMutation, {name: "addProjectMutation"}) //
)(AddProject); // inside AddProject we have access to data from query via this.props
