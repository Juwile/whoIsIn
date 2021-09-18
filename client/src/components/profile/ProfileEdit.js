import React, {Component} from 'react';
import { graphql } from 'react-apollo'; // helps getting query into component. Compose in order that multiple queries can be binded at bottom.
import flowright from 'lodash.flowright'; // instead of compose. compose no longer existing
import {getProfilesQuery, updateProfileMutation } from "../../queries/queries";


class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { // initial state
            id:'',
            firstname:'',
            lastname:'',
            role:'',
            background:'',
            goals:'',
            absences:'',
        }
    }

    displayProfiles(){
        var data = this.props.getProfilesQuery;
        if(data.loading){
            return(<option disabled>Loading profiles</option>)
        } else{
            return data.profiles.map(profile => {
                return(<option key={profile.id} value={profile.id}>{profile.firstname} {profile.lastname}</option>)
            })
        }
    }

    submitForm(e){
        e.preventDefault();
        this.props.updateProfileMutation({
            variables: {
                id: this.state.id,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                role: this.state.role,
                background: this.state.background,
                goals: this.state.goals,
                absences: this.state.absences
            }
        }); // addProjectMutation defined at bottom
    }

    updateAbsenceArray() {
        const absences = document.getElementsByName("absence");
        const absencesArray = [];
        // loop over them all
        for (var i=0; i<absences.length; i++) {
            // And stick the checked ones onto an array...

            absencesArray.push(absences[i].value);

        }
        // Return the array if it is non-empty, or null
        return absencesArray.length > 0 ? absencesArray : null;
    }


    render() {
        return (
            <div className="box-styling update dashboard">
                <form id="update-profile" onSubmit={ this.submitForm.bind(this) }>
                    <div className="field">
                        <label>Profile to edit</label>
                        <select onChange={ (e) => this.setState({ id:e.target.value})}>
                            <option>Select Profile</option>
                            { this.displayProfiles() }
                        </select>
                    </div>
                    <div className="field">
                        <label>Firstname:</label>
                        <input type="text" onChange={ (e) => this.setState({ firstname:e.target.value})} />
                    </div>
                    <div className="field">
                        <label>Lastname:</label>
                        <input type="text" onChange={ (e) => this.setState({ lastname:e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Role:</label>
                        <select onChange={ (e) => this.setState({ role:e.target.value})}>
                            <option>Select Role</option>
                            <option key={1} value={'UX'}>UX</option>
                            <option key={2} value={'Backend'}>Backend</option>
                            <option key={3} value={'Frontend'}>Frontend</option>
                            <option key={4} value={'Design'}>Design</option>
                            <option key={5} value={'Concepts'}>Concepts</option>
                            <option key={6} value={'Analytics'}>Analytics</option>
                        </select>
                    </div>
                    <div className="field">
                        <label>Background:</label>
                        <input type="text" onChange={ (e) => this.setState({ background:e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Goals:</label>
                        <input type="text" onChange={ (e) => this.setState({ goals:e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Absences (not working for SBB)</label>
                        <input name="absence" type="date" onChange={ (e) => this.setState({ absences:this.updateAbsenceArray()})}/>
                    </div>
                    <div className="field">
                        <label>Absences (not working for SBB)</label>
                        <input name="absence" type="date" onChange={ (e) => this.setState({ absences:this.updateAbsenceArray()})}/>
                    </div>
                    <div className="field">
                        <button>Update profile</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default flowright(
    graphql(updateProfileMutation, {name: "updateProfileMutation"}),
    graphql(getProfilesQuery, {name: "getProfilesQuery"}) //
)(UpdateProfile); // inside AddProject we have access to data from query via this.props
