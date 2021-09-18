import React, {Component} from 'react';
import { graphql } from 'react-apollo'; // helps getting query into component. Compose in order that multiple queries can be binded at bottom.
import flowright from 'lodash.flowright'; // instead of compose. compose no longer existing
import {
    getSprintsQuery,
    updateSprintMutation,
} from "../../queries/queries";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class UpdateSprint extends Component {
    constructor(props) {
        super(props);
        this.state = { // initial state
            id:'',
            number:'',
            startDate:new Date(),
            endDate:new Date(),
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
        this.props.updateSprintMutation({
            variables: {
                id: this.state.id,
                number: parseInt(this.state.number),
                startDate: this.state.startDate,
                endDate: this.state.endDate,
            }
        }); // addProjectMutation defined at bottom
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

    render() {
        return (
            <div className="box-styling update dashboard">
                <h2>Edit sprint</h2>
                <form id="update-sprint" onSubmit={ this.submitForm.bind(this) }>
                    <div className="field">
                        <label>Sprint to edit</label>
                        <select onChange={ (e) => this.setState({ id:e.target.value})}>
                            <option>Select Sprint</option>
                            { this.displaySprints() }
                        </select>
                    </div>
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
                        <button>Update sprint</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default flowright(
    graphql(getSprintsQuery, {name: "getSprintsQuery"}),
    graphql(updateSprintMutation, {name: "updateSprintMutation"}),
)(UpdateSprint); // inside AddProject we have access to data from query via this.props
