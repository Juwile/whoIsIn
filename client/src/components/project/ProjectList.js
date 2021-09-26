import React, {Component} from 'react';
import { graphql } from 'react-apollo'; // helps getting query into component
import { getProjectsQuery } from "../../queries/queries"; // at the bottom query is related to component
import Accordion from 'react-bootstrap/Accordion';
import {format, parseISO} from "date-fns";

// components
import ProjectDetail from "./ProjectDetail";
const _= require('lodash');


class ProjectList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null // keeps track off which book is clicked on (for eventlistener onclick)
        }
    }


    displayAccordion(){
      var data = this.props.data;
      if(data.loading){
          return(<div>Loading projects...</div>);
      }else {
        //sorting
        var projectsSorted = _.sortBy(data.projects, ['date']);
          return projectsSorted.map(project => { //map iterates through all projects
              return(
                <Accordion.Item eventKey={project.id}>
                  <Accordion.Header>{project.title} - {format(parseISO(project.date),'dd.MM.yyyy')}</Accordion.Header>
                  <Accordion.Body>
                  <div>
                      <h3 className="h3class">{project.title}</h3>
                      <p>{project.description}</p>
                      <p>Loaction: {project.location}</p>
                      <p>Date: {format(parseISO(project.date),'dd.MM.yyyy')}</p>
                      <p>Time: {project.time}</p>
                      <p>Mehr Informationen: <a href={project.link}>{project.link}</a></p>
                  </div>
                  </Accordion.Body>
                  </Accordion.Item>
              );
          })
        }
    }

    render() {
        return (
            <div className="main detailpage">
            <div className="h1-grid">
              <h1 className="h1class">JOYFUL NOISE</h1>
              <p className="lead">Events für alle!</p>
              <p className="lead">Was einmal selbstverständlich war, muss man heute leider explizit hervorheben. Nebst diskriminierungsfreien Events findest du hier auch die nächsten Demonstrationen gegen Corona-Massnahmen und die Zertifikatspflicht - es werden nur bewilligte Demos aufgeführt.</p>
            </div>
                <div className="content">
                  <h2 className="h2class">Diskriminierungsfreie Events und Demos</h2>
                  <Accordion>
                    { this.displayAccordion() }
                  </Accordion>
                  <h2 className="h2class">About</h2>
                  <p className="lead">Ausschlaggebend für das Erstellen dieser Website war die Zertifikatspflicht und die somit aufkommende 2-Klassen-Gesellschaft in der Schweiz. Mit dieser Seite soll dazu beigetragen werden, die Menschen wieder zusammen zu führen. Events welche für ALLE zugänglich sind, werden hier einfacher auffindbar gemacht.</p>
                </div>
            </div>
        );
    }
}

export default graphql(getProjectsQuery)(ProjectList); // inside ProjectList we have access to data from query via this.props


/*<div className="content">
    <h1>Event Overview</h1>
    <ul className="list">
        { this.displayProjects() }
    </ul>
</div>*/
