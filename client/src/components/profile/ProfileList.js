import React, {Component} from 'react';
import { graphql } from 'react-apollo'; // helps getting query into component
import { getProfilesQuery } from "../../queries/queries";

//components
import AddProfile from "./AddProfile";
import ProfileDetail from "./ProfileDetail";
import ChatComponent from "../ChatComponent";


class ProfileList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null // keeps track off which book is clicked on (for eventlistener onclick)
        }
    }

    displayProfiles(){
        var data = this.props.data; // data property from props which is returned
        if(data.loading){
            return(<div>Loading profiles...</div>);
        }else {
            return data.profiles.map(profile => { //map iterates through all projects
                return(
                    <li key={profile.id} onClick={ (e) => {this.setState({selected: profile.id})}}>{profile.firstname} {profile.lastname}</li>
                );
            })
        }
    }

    render() {
        return (
            <div className="main detailpage">
                <div className="content box-styling">
                    <h1>Teammates</h1>
                    <ul className="list">
                        { this.displayProfiles() }
                    </ul>
                </div>
                <AddProfile />
                <ProfileDetail profileId={this.state.selected}/>
                <ChatComponent />
            </div>
        );
    }
}

export default graphql(getProfilesQuery)(ProfileList); // inside ProjectList we have access to data from query via this.props
