import { NavLink } from 'react-router-dom';

import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider} from 'react-apollo'; // wraps information into react
import logo from './pics/logo_blue.png';

// components
import Contents from "./Contents.js";
import BurgerMenu from "./components/BurgerMenu";

// apollo client setup
const client = new ApolloClient({
  uri: '/graphql' // endpoint of Graphql - für Entwicklung http://localhost:4000/graphql,
    // für Production /graphql --> in package.json proxy eingerichtet damit beides funktioniert
})


function Header() {
    return(
        <header>
            <nav className="navBar">
                <NavLink exact to="/">Home</NavLink>
                {' | '}
                <NavLink to="/projects">Contact</NavLink>
            </nav>
        </header>
    )
}

function Footer() {
    return(
        <footer>
            <p>made for everyone with &#9825; </p>
        </footer>
    )
}

export default function App() {
    return(
        <ApolloProvider client={client}>
            <div>
                <BurgerMenu />
                <div class="diagonal-box">
                  <div id="page-wrap" className="wrapper">
                      <Header/>
                      <Contents />
                      <Footer />
                  </div>
                </div>
            </div>
        </ApolloProvider>
    );
}
