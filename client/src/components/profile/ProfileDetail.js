import React, {Component} from 'react';
import { graphql } from 'react-apollo'; // helps getting query into component
import {getProfileQuery, deleteProfileMutation, getProfilesQuery} from "../../queries/queries";
import flowright from "lodash.flowright";
import { format, parseISO } from 'date-fns'




class ProfileDetail extends Component {
    constructor(props) {
        super(props);
        this.deleteProfile = this.deleteProfile.bind(this);
        this.state = { // initial state
            showBox: false
        }
    }


    displayProfileDetails(){
        const { profile } = this.props.data // would be the same as const profile = this.props.data.profile

        if (profile){ // if true then
            return (
                <div>
                    <h2>{profile.firstname} {profile.lastname}</h2>
                    <p>Role: {profile.role}</p>
                    <p>Background: {profile.background}</p>
                    <p>Goals: {profile.goals}</p>
                    <p>Absences (not working for SBB):</p>
                    <ul className="other">
                        { profile.absences.map(item => {
                            return <li key={item}>{format(parseISO(item),'dd.MM.yyyy')}</li>
                        })
                        }
                    </ul>
                    <a href="/edit-profile"><button>Edit Profile</button></a>
                    <button ref="#" onClick={(event) => {this.deleteProfile(profile.id); this.setState( () => ({showBox: true}))}}>Delete Profile</button>
                </div>
            )
        } else {
            return (
                <div className="placeholder">
                    <h2>Details about...</h2>
                    <p>Please select teammate</p>
                </div>
            )
        }
    }

    deleteProfile(currentId) {
        this.props.deleteProfileMutation({
            variables: {
                id: currentId,
                profileId: currentId
            },
            refetchQueries:[{ // Updates project list
                query: getProfilesQuery
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
                <p>Profile deleted &#10004;</p>
            </div>
        )
    }

    render() {
        //console.log("in render function", this.props); // this.props von profileList selected hierhin vererbt

        return (
            <div className="details box-styling">
                <div>
                    { this.state.showBox ? this.displayConfirmationBox() : null }
                </div>
                <div>
                    {this.displayProfileDetails()}
                </div>
            </div>
        );
    }
}



export default flowright(
    graphql(getProfileQuery, {
        options: (props) => { // whenever props updates the variable id will be newly set
            return {
                variables: {
                    id: props.profileId
                }
            }
        }
    }),
    graphql(deleteProfileMutation,{name: "deleteProfileMutation"})
)(ProfileDetail); // inside AddProject we have access to data from query via this.props
