import React, {Component} from 'react';
import { graphql } from 'react-apollo'; // helps getting query into component. Compose in order that multiple queries can be binded at bottom.
import flowright from 'lodash.flowright'; // instead of compose. compose no longer existing
import {getProfilesQuery, addProfileMutation } from "../../queries/queries";


class AddProfile extends Component {
    constructor(props) {
        super(props);

        this.state = { // initial state
            firstname:'',
            lastname:'',
            role:'',
            background:'',
            goals:'',
            absences:'',
            numChildren: 0,
            showBox: false
        }
    }

    submitForm(e){
        e.preventDefault();
        this.props.addProfileMutation({
            variables: {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                role: this.state.role,
                background: this.state.background,
                goals: this.state.goals,
                absences: this.state.absences
            },
            refetchQueries:[{ // Updates project list
                query: getProfilesQuery
            }]
        }); // addProjectMutation defined at bottom
        const frm = document.getElementById('add-profile');
        frm.reset();
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

    displayConfirmationBox(){
        setTimeout(() => (
            this.setState( () => ({
                showBox: false
            }))),3000);
        return(
            <div className="confirmation-box">
                <p>Profile Added &#10004;</p>
            </div>
        )
    }


    render() {
        return (
            <div className="form-content box-styling">
                <div>
                    { this.state.showBox ? this.displayConfirmationBox() : null }
                </div>
                <h2>Add new profile</h2>
                <form id="add-profile" onSubmit={ this.submitForm.bind(this) }>
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
                        <label>Absences</label>
                        <input name="absence" type="date" onChange={ (e) => this.setState({ absences:this.updateAbsenceArray()})}/>
                    </div>
                    <div className="field">
                        <label>Absences</label>
                        <input name="absence" type="date" onChange={ (e) => this.setState({ absences:this.updateAbsenceArray()})}/>
                    </div>
                    <div className="field">
                        <button onClick={ () => this.setState( () => ({showBox: true}))}>Add profile</button>
                    </div>
                </form>
            </div>
        );
    }
}


export default flowright(
    graphql(addProfileMutation, {name: "addProfileMutation"}) //
)(AddProfile); // inside AddProject we have access to data from query via this.props





/*

function ParentComponent(props){
    return(
        <div className="card calculator">
            <p><a href="#" onClick={props.addChild}>Add Another Child Component</a></p>
            <div id="children-pane">
                {props.children}
            </div>
        </div>
    )
}



class ChildComponent extends Component{
    constructor() {
        super();
        this.state = {
            absences: ''
        }
    }
    render() {
        console.log('props in child', this.props)
        return(
            <div className="field">
                <label>Absences (not working for SBB)</label>
                <input type="date" onChange={ (e) => this.setState({ absences:e.target.value})}/>
            </div>
        );
    }
}


class AddProfile extends Component {
    constructor(props) {
        super(props);

        this.state = { // initial state
            firstname:'',
            lastname:'',
            role:'',
            background:'',
            goals:'',
            absences:'',
            numChildren: 0,
            showBox: false
        }
    }


    handleChange2(date){
        this.setState({
            startDate: date
        });
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };



addNewDate(){
    return(
        <div>
            <div className="field">
            <label>Absences (not working for SBB)</label>
            <input type="date" onChange={ (e) => this.setState({ absences:e.target.value})}/>
            </div>
            <div className="field">
                <button ref="#" onClick={(event) => {this.addNewDate()}}>Add Absence</button>
            </div>
        </div>
    )
}

addAbsence(){
    this.addNewDate();
}

submitForm(e){
    e.preventDefault();
    console.log('state in form', this.state)
    console.log('props', this.props);
    this.props.addProfileMutation({
        variables: {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            role: this.state.role,
            background: this.state.background,
            goals: this.state.goals,
            absences: this.state.absences
        },
        refetchQueries:[{ // Updates project list
            query: getProfilesQuery
        }]
    }); // addProjectMutation defined at bottom
    const frm = document.getElementById('add-profile');
    frm.reset();
}

onAddChild() {


    console.log('onaddchild called')
    console.log('this props', this.props);
    console.log('this state addchild', this.state)
    this.setState({
        numChildren: this.state.numChildren + 1
    });
}

updateAbsenceArray() {
    console.log('absence array function called')
    const absences = document.getElementsByName("absence");
    console.log('absences', absences[0].value);
    console.log('id of single checkbox', absences[0]);
    const absencesArray = [];
    // loop over them all
    for (var i=0; i<absences.length; i++) {
        // And stick the checked ones onto an array...

        absencesArray.push(absences[i].value);

    }
    // Return the array if it is non-empty, or null
    return absencesArray.length > 0 ? absencesArray : null;
}

displayConfirmationBox(){
    setTimeout(() => (
        this.setState( () => ({
            showBox: false
        }))),3000);
    return(
        <div className="confirmation-box">
            <p>Profile Added &#10004;</p>
        </div>
    )
}


render() {
    const children = [];
    for (var i = 0; i < this.state.numChildren; i += 1) {
        children.push(<ChildComponent key={i} number={i} />);
    }

    return (
        <div className="form-content box-styling">
            <div>
                { this.state.showBox ? this.displayConfirmationBox() : null }
            </div>
            <h2>Add new profile</h2>
            <form id="add-profile" onSubmit={ this.submitForm.bind(this) }>
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
                <ParentComponent addChild={ () => this.onAddChild()}>
                    {children}
                </ParentComponent>
                <div className="field">
                    <button onClick={ () => this.setState( () => ({showBox: true}))}>Add profile</button>
                </div>
            </form>
        </div>
    );
}
}


*/