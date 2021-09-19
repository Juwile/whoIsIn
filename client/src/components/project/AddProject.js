import React, {Component} from 'react';
import { graphql } from 'react-apollo'; // helps getting query into component. Compose in order that multiple queries can be binded at bottom.
import flowright from 'lodash.flowright'; // instead of compose. compose no longer existing
import {getProfilesQuery, addProjectMutation, getProjectsQuery} from "../../queries/queries";
import DatePicker from "react-datepicker";

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state = { // initial state
            title:'New Project',
            status:'',
            effort:'',
            created:new Date(),
            due:new Date(),
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
        this.props.addProjectMutation({
            variables: {
                title: this.state.title,
                status: this.state.status,
                effort: parseInt(this.state.effort),
                created: this.state.created,
                due: this.state.due,
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
                <h2>Add new project</h2>
                <form id="add-project" onSubmit={ this.submitForm.bind(this) }>
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
                        <button onClick={ () => this.setState( () => ({showBox: true}))}>Add project</button>
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
