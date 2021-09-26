import React, {Component} from 'react';
import { graphql } from 'react-apollo'; // helps getting query into component
import { getProjectsQuery } from "../../queries/queries"; // at the bottom query is related to component
import Accordion from 'react-bootstrap/Accordion';
import {format, parseISO} from "date-fns";

// components
import AddProject from "./AddProject";

const _= require('lodash');



class AddProjectPage extends Component {
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
                <div className="content box-styling">
                    <h1>Event Overview</h1>
                    <Accordion>
                      { this.displayAccordion() }
                    </Accordion>
                    <AddProject/>
                </div>

            </div>
        );
    }
}

export default graphql(getProjectsQuery)(AddProjectPage); // inside ProjectList we have access to data from query via this.props
