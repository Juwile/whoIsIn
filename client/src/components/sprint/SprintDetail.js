import React, {Component} from 'react';
import { graphql } from 'react-apollo'; // helps getting query into component
import { getSprintsQuery, getSprintQuery, deleteSprintMutation} from "../../queries/queries";
import flowright from "lodash.flowright";
import { format, parseISO, eachDayOfInterval, eachWeekendOfInterval } from 'date-fns'


class SprintDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { // initial state
            showBox: false
        }
    }

    eachDayFunction(){
        const sprint = this.props.data.sprint
        const result = eachDayOfInterval({
                start: parseISO(sprint.startDate),
                end: parseISO(sprint.endDate)
        }
        )
        return(
            result.length
        )
    }

    eachWeekendFunction(){
        const sprint = this.props.data.sprint
        const result = eachWeekendOfInterval({
                start: parseISO(sprint.startDate),
                end: parseISO(sprint.endDate)
            }
        )
        console.log(result)
        return(
            result.length
        )
    }

    numberOfWorkingDays(){
        const allDays = this.eachDayFunction();
        const WeekendDays = this.eachWeekendFunction();
        const workingDays = allDays-WeekendDays;
        return(
            workingDays
        )
    }

    displaySprintDetails(){
        const sprint = this.props.data.sprint // would be the same as const project = this.props.data.project
        if (sprint){ // if true then
            return (
                <div>
                    <h2>Sprint {sprint.number}</h2>
                    <p>Start date: {format(parseISO(sprint.startDate),'dd.MM.yyyy')} </p>
                    <p>End date: {format(parseISO(sprint.endDate),'dd.MM.yyyy')} </p>
                    <p>Number of days in sprint: {this.eachDayFunction()}</p>
                    <p>Number of weekend days: {this.eachWeekendFunction()}</p>
                    <p>Number of working days: {this.numberOfWorkingDays()} </p>
                    <p>All projects in this sprint</p>
                    <ul className="other">
                        { sprint.projects.map(item => {
                            if(item.title !== undefined){
                                return <li key={item.id}>{item.title}</li>
                            } else{
                                return <div>No sprints in here</div>
                            }
                        })
                        }
                    </ul>
                    <a href="/edit-sprint"><button>Edit Sprint</button></a>
                    <button ref="#" onClick={(event) => {this.deleteSprint(sprint.id); this.setState( () => ({showBox: true}))}}>Delete Sprint</button>
                </div>
            )
        } else {
            return (
                <div className="placeholder">
                    <h2>Sprint Details</h2>
                    <p>Please select sprint</p>
                </div>
            )
        }
    }

    deleteSprint(currentId) {
        this.props.deleteSprintMutation({
            variables: {
                id: currentId,
                sprintId: currentId
            },
            refetchQueries:[{ // Updates project list
                query: getSprintsQuery
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
                <p>Sprint deleted &#10004;</p>
            </div>
        )
    }



    render() {
        return (
            <div className="details box-styling">
                <div>
                    { this.state.showBox ? this.displayConfirmationBox() : null }
                </div>
                <div>
                    {this.displaySprintDetails()}
                </div>
            </div>
        );
    }
}


export default flowright(
    graphql(getSprintQuery, {
        options: (props) => { // whenever props updates the variable id will be newly set
            return {
                variables: {
                    id: props.sprintId
                }
            }
        }
    }),
    graphql(deleteSprintMutation,{name: "deleteSprintMutation"})
)(SprintDetail);
