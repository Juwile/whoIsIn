import React from 'react';
import logo from "../pics/logo.png";

export default function Home() {
    return(
        <div className="main home">
            <div className="teaser box-styling">
                <h1 className="visuallyhidden">RePro</h1>
                <img className="logo-home" src={logo} alt="Logo" />
                <p>Match resources to upcoming projects and organize everything!</p>
                <a href="/profiles">Teammates</a>
                <a href="/projects">Events</a>
            </div>
        </div>
    );
}
