import React, {Component} from 'react';
import {graphql} from 'react-apollo'; // helps getting query into component
import {getAbsencesQuery, getProfilesQuery, getSprintQuery} from "../../queries/queries";
import flowright from "lodash.flowright";
import {eachDayOfInterval, eachWeekendOfInterval, format, isWithinInterval, parseISO} from 'date-fns'


class DashboardDetail extends Component {

    absenceDays(){
        const sprint = this.props.data.sprint;
        const allAbsences = this.props.getAbsencesQuery.profiles;
        const absencesArray = [];

        allAbsences.map(item => {
            const singleItemAbsences = item.absences; // pro item.absences hat es wiederum einen Array mit Daten, darum nochmal map
            singleItemAbsences.map(singleAbsence => {
                if(
                    isWithinInterval( // Prüft ob Absenz innerhalb des Sprint Zeitraumes
                        parseISO(singleAbsence), { start: parseISO(sprint.startDate), end: parseISO(sprint.endDate)}
                    )
                ){
                    absencesArray.push(singleAbsence)
                }

            })

            //;
        })
        return absencesArray.length

    }

    storyPoints(){
        const allEmployees = this.props.getProfilesQuery.profiles;
        const totalEmployees = allEmployees.length;
        const workingDays = this.numberOfWorkingDays();
        return workingDays * totalEmployees

    }


    storyPointsWithAbsences(){
        const allEmployees = this.props.getProfilesQuery.profiles;
        const workingDays = this.numberOfWorkingDays();
        const totalEmployees = allEmployees.length;
        const totalStoryPoints = workingDays*totalEmployees;
        const absenceDays = this.absenceDays();
        return totalStoryPoints - absenceDays // in der Annahme, dass 1 Storypoint = 1 Tag

    }

    absencesPerRole(){
        const sprint = this.props.data.sprint;
        const allEmployees = this.props.getProfilesQuery.profiles;
        const absencesInSprintBackend = [];
        const absencesInSprintFrontend = [];
        const absencesInSprintUX = [];

        allEmployees.map(item => {
            if(item.role === 'Backend'){
                const absences = item.absences;
                absences.map(singleAbsence => {
                        if(isWithinInterval( // Prüft ob Absenz innerhalb des Sprint Zeitraumes
                                parseISO(singleAbsence), { start: parseISO(sprint.startDate), end: parseISO(sprint.endDate)}
                            )
                        ){
                            absencesInSprintBackend.push(singleAbsence)
                        }
                    }
                )
            }else if(item.role === 'Frontend'){
                const absences = item.absences;
                absences.map(singleAbsence => {
                        if(isWithinInterval( // Prüft ob Absenz innerhalb des Sprint Zeitraumes
                            parseISO(singleAbsence), { start: parseISO(sprint.startDate), end: parseISO(sprint.endDate)}
                        )
                        ){
                            absencesInSprintFrontend.push(singleAbsence)
                        }
                    }
                )
            } else if(item.role === 'UX'){
                const absences = item.absences;
                absences.map(singleAbsence => {
                        if(isWithinInterval( // Prüft ob Absenz innerhalb des Sprint Zeitraumes
                            parseISO(singleAbsence), { start: parseISO(sprint.startDate), end: parseISO(sprint.endDate)}
                        )
                        ){
                            absencesInSprintUX.push(singleAbsence)
                        }
                    }
                )
            }
        })
        return (
            <ul>
                <li className="dashboard-li" key={1}>Backend: {absencesInSprintBackend.length}</li>
                <li className="dashboard-li" key={2}>Frontend: {absencesInSprintFrontend.length}</li>
                <li className="dashboard-li" key={3}>UX: {absencesInSprintUX.length}</li>
            </ul>
        )
    }

    absencesPerRoleObject(){
        const sprint = this.props.data.sprint;
        const allEmployees = this.props.getProfilesQuery.profiles;
        const absencesInSprintBackend = [];
        const absencesInSprintFrontend = [];
        const absencesInSprintUX = [];

        allEmployees.map(item => {
            if(item.role === 'Backend'){
                const absences = item.absences;
                absences.map(singleAbsence => {
                        if(isWithinInterval( // Prüft ob Absenz innerhalb des Sprint Zeitraumes
                            parseISO(singleAbsence), { start: parseISO(sprint.startDate), end: parseISO(sprint.endDate)}
                        )
                        ){
                            absencesInSprintBackend.push(singleAbsence)
                        }
                    }
                )
            }else if(item.role === 'Frontend'){
                const absences = item.absences;
                absences.map(singleAbsence => {
                        if(isWithinInterval( // Prüft ob Absenz innerhalb des Sprint Zeitraumes
                            parseISO(singleAbsence), { start: parseISO(sprint.startDate), end: parseISO(sprint.endDate)}
                        )
                        ){
                            absencesInSprintFrontend.push(singleAbsence)
                        }
                    }
                )
            } else if(item.role === 'UX'){
                const absences = item.absences;
                absences.map(singleAbsence => {
                        if(isWithinInterval( // Prüft ob Absenz innerhalb des Sprint Zeitraumes
                            parseISO(singleAbsence), { start: parseISO(sprint.startDate), end: parseISO(sprint.endDate)}
                        )
                        ){
                            absencesInSprintUX.push(singleAbsence)
                        }
                    }
                )
            }
        })
        return ({
            backend: absencesInSprintBackend.length,
            frontend: absencesInSprintFrontend.length,
            ux: absencesInSprintUX.length
        }
        )
    }

    storyPointsPerRole(){
        const numberOfWorkingDays = this.numberOfWorkingDays();
        const absences = this.absencesPerRoleObject();
        const employees = this.employeesPerRoleObject();
        console.log('array absences', absences.backend)
        console.log('array employees', employees.backend)
        return(
            <ul>
                <li className="dashboard-li" key={1}>Backend: {numberOfWorkingDays*employees.backend - absences.backend}</li>
                <li className="dashboard-li" key={2}>Frontend: {numberOfWorkingDays*employees.frontend - absences.frontend}</li>
                <li className="dashboard-li" key={3}>UX: {numberOfWorkingDays*employees.ux - absences.ux}</li>
            </ul>
        )


    }

    employeesPerRoleObject(){
        const allEmployees = this.props.getProfilesQuery.profiles;
        const backend = [];
        const frontend = [];
        const ux = [];

        allEmployees.map(item => {
            if(
                item.role === 'Backend'){
                backend.push(item)
            } else if(
                item.role === 'Frontend') {
                frontend.push(item)
            } else if(
                item.role === 'UX') {
                ux.push(item)
            }
        })
        return ({
            backend: backend.length,
            frontend: frontend.length,
            ux: ux.length
        })
    }


    employeesPerRole(){
        const allEmployees = this.props.getProfilesQuery.profiles;
        const backend = [];
        const frontend = [];
        const ux = [];

        allEmployees.map(item => {
            if(
                item.role === 'Backend'){
                backend.push(item)
            } else if(
                item.role === 'Frontend') {
                frontend.push(item)
            } else if(
                item.role === 'UX') {
                ux.push(item)
            }
        })
        return (
            <ul>
                <li className="dashboard-li" key={1}>Backend: {backend.length}</li>
                <li className="dashboard-li" key={2}>Frontend: {frontend.length}</li>
                <li className="dashboard-li" key={3}>UX: {ux.length}</li>
            </ul>
        )
    }

    eachDayFunction(){
        const sprint = this.props.data.sprint
        const result = eachDayOfInterval({
                start: parseISO(sprint.startDate),
                end: parseISO(sprint.endDate)
            }
        )
        return result.length
    }

    eachWeekendFunction(){
        const sprint = this.props.data.sprint
        const result = eachWeekendOfInterval({
                start: parseISO(sprint.startDate),
                end: parseISO(sprint.endDate)
            }
        )
        return result.length
    }

    numberOfWorkingDays(){
        const allDays = this.eachDayFunction();
        const WeekendDays = this.eachWeekendFunction();
        return allDays - WeekendDays
    }

    isActiveSprint(){
        const sprint = this.props.data.sprint;
        const today = new Date();
        if(isWithinInterval(
                today, { start: parseISO(sprint.startDate), end: parseISO(sprint.endDate)}
            )
        ){
            return "Yes"
        } else{
            return "No"
        }
    }

    displaySprintDetails(){
        const sprint = this.props.data.sprint // would be the same as const project = this.props.data.project
        if (sprint){ // if true then
            return (
                <div>
                    <div>
                        <h3>Sprint {sprint.number}</h3>
                    </div>
                    <div className="dashboard-details">
                        <h4>Dates</h4>
                        <p>Active Sprint: {this.isActiveSprint()}</p>
                        <p>Start date: {format(parseISO(sprint.startDate),'dd.MM.yyyy')} </p>
                        <p>End date: {format(parseISO(sprint.endDate),'dd.MM.yyyy')} </p>
                        <p>Working days in sprint: {this.numberOfWorkingDays()} </p>
                        <p>Total absences: {this.absenceDays()}</p>
                        <p>Absences per role: {this.absencesPerRole()} </p>
                        <h4>Story Points</h4>
                        <p>Total possible story points without absences: {this.storyPoints()}</p>
                        <p>Total story points (absences included): {this.storyPointsWithAbsences()}</p>
                        <p>Story points per role: {this.storyPointsPerRole()} </p>
                        <h4>Projects</h4>
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
                        <p>Number of employees per role: {this.employeesPerRole()} </p>
                    </div>
                </div>

            )
        } else {
            return (
                <div className="dashboard-placeholder">
                    <h3>Sprint Details</h3>
                    <p>Please select sprint</p>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="details box-styling dashboard-boxes">
                {this.displaySprintDetails()}
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
    graphql(getAbsencesQuery, {name: "getAbsencesQuery"}),
    graphql(getProfilesQuery, {name: "getProfilesQuery"})
    )(DashboardDetail);
