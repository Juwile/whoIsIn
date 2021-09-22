import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProjectList from './components/project/ProjectList.js';
import Home from './components/Home.js';
import AddProject from "./components/project/AddProject";
import ProfileList from "./components/profile/ProfileList";
import AddProfile from "./components/profile/AddProfile";
import ProfileEdit from "./components/profile/ProfileEdit";
import ChatComponent from "./components/ChatComponent";
import UpdateProject from "./components/project/ProjectEdit";
import AddProjectPage from "./components/project/AddProjectPage";


const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
    return(
        <Switch>
            <Redirect exact from="/" to="/home"/>
            <Route path="/home" component={Home} />
            <Route path="/projects" component={ProjectList} />
            <Route path="/add-project" component={AddProjectPage} />
            <Route path="/edit-project" component={UpdateProject} />
            <Route path="/profiles" component={ProfileList} />
            <Route path="/add-profile" component={AddProfile} />
            <Route path="/edit-profile" component={ProfileEdit} />
            <Route path="/chat" component={ChatComponent} />
            <Route component={NotFound} />
        </Switch>
    );
}
