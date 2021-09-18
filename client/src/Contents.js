import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProjectList from './components/project/ProjectList.js';
import Home from './components/Home.js';
import AddProject from "./components/project/AddProject";
import ProfileList from "./components/profile/ProfileList";
import SprintList from "./components/sprint/SprintList";
import AddProfile from "./components/profile/AddProfile";
import AddSprint from "./components/sprint/AddSprint";
import ProfileEdit from "./components/profile/ProfileEdit";
import ChatComponent from "./components/ChatComponent";
import Dashboard from "./components/dashboard/Dashboard";
import UpdateProject from "./components/project/ProjectEdit";
import UpdateSprint from "./components/sprint/SprintEdit";


const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
    return(
        <Switch>
            <Redirect exact from="/" to="/home"/>
            <Route path="/home" component={Home} />
            <Route path="/projects" component={ProjectList} />
            <Route path="/add-project" component={AddProject} />
            <Route path="/edit-project" component={UpdateProject} />
            <Route path="/profiles" component={ProfileList} />
            <Route path="/add-profile" component={AddProfile} />
            <Route path="/edit-profile" component={ProfileEdit} />
            <Route path="/sprints" component={SprintList} />
            <Route path="/add-sprint" component={AddSprint} />
            <Route path="/edit-sprint" component={UpdateSprint} />
            <Route path="/chat" component={ChatComponent} />
            <Route path="/dashboard" component={Dashboard} />
            <Route component={NotFound} />
        </Switch>
    );
}








