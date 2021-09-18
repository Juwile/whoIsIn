import React, {Component} from 'react';
import { graphql } from 'react-apollo'; // helps getting query into component. Compose in order that multiple queries can be binded at bottom.
import flowright from 'lodash.flowright'; // instead of compose. compose no longer existing
import {
    getSprintsQuery,
    addSprintMutation,
    getProjectsQuery,
} from "../../queries/queries";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddSprint extends Component {
    constructor(props) {
        super(props);
        this.state = { // initial state
            number:0,
            startDate:new Date(),
            endDate:new Date(),
            showBox: false
        }
    }

    handleChangeStart = date => {
        this.setState({
            startDate: date
        });
    };


    handleChangeEnd = date => {
        this.setState({
            endDate: date
        });
    };

    datePicker(){
        return (
            <div>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChangeStart}
                    selectsStart
                />
                <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleChangeEnd}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    minDate={this.state.startDate}
                />
            </div>
        );
    }

    submitForm(e){
        e.preventDefault();
        this.props.addSprintMutation({
            variables: {
                number: parseInt(this.state.number),
                startDate: this.state.startDate,
                endDate: this.state.endDate,
            },
            refetchQueries:[{ // Updates project list
                query: getSprintsQuery
            }]
        }); // addProjectMutation defined at bottom
        const frm = document.getElementById('add-sprint');
        frm.reset();
    }

    displayConfirmationBox(){
        setTimeout(() => (
            this.setState( () => ({
                showBox: false
            }))),3000);
        return(
            <div className="confirmation-box">
                <p>Sprint Added &#10004;</p>
            </div>
        )
    }

    render() {
        return (
            <div className="form-content box-styling">
                <div>
                    { this.state.showBox ? this.displayConfirmationBox() : null }
                </div>
                <h2>Add new sprint</h2>
                <form id="add-sprint" onSubmit={ this.submitForm.bind(this) }>
                    <div className="field">
                        <label>Sprint Number:</label>
                        <input type="number" onChange={ (e) => this.setState({ number:e.target.value})} />
                    </div>
                    <div className="field">
                        <label>Sprint duration</label>
                        <div className="form-input">
                            {this.datePicker()}
                        </div>
                    </div>
                    <div className="field">
                        <button onClick={ () => this.setState( () => ({showBox: true}))}>Add sprint</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default flowright(
    graphql(addSprintMutation, {name: "addSprintMutation"}),
    graphql(getProjectsQuery, {name: "getProjectsQuery"}),
)(AddSprint); // inside AddProject we have access to data from query via this.props


/*
class DatePickerClass extends React.Component {
    constructor(props) {
        super(props);
        console.log('props in DatePicker', props)
        const propsSprint = this.props;
        console.log('propsSpdrint', propsSprint);
        const propsSprint2 = this.props.propfromAddSprint;
        console.log('propsSpdrint2', propsSprint2);
        const propsSprint3 = this.props.propfromAddSprint[0];
        console.log('propsSpdrint3', propsSprint3);
        this.state = this.props.propfromAddSprint;
        console.log('this state after setting', this.state)
    }


    handleChangeStart = date => {
        this.setState({
            startDatePicker: date,
            startDate: date
        });
        console.log('this state in DatePicker after handleChangeStart', this.state)
    };

    handleChangeEnd = date => {
        this.setState({
            endDatePicker: date,
            endDate: date
        });


        console.log('this state in DatePicker after handleChangeEnd', this.state)
    };

    render() {
        return (
            <div>
                <DatePicker
                    selected={this.state.startDatePicker}
                    onChange={this.handleChangeStart}
                    selectsStart
                    startDate={this.state.startDatePicker}
                    endDate={this.state.endDatePicker}

                />
                <DatePicker
                    selected={this.state.endDatePicker}
                    onChange={this.handleChangeEnd}
                    selectsEnd
                    startDate={this.state.startDatePicker}
                    endDate={this.state.endDatePicker}
                    minDate={this.state.startDatePicker}
                />
            </div>
        );
    }
}
*/
