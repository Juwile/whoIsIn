import React from 'react';
import { NavLink } from 'react-router-dom';
import './default.css';
import logo from './pictures/logo.svg';
import insta from './pictos/insta.png'
import facebook from './pictos/facebook.png'
import BurgerMenu from "./BurgerMenu.js";


import Contents from "./Contents.js";

function NavBar() {
    return(
        <div>
            <header>
                <NavLink to="/home"><img src={logo} alt="Logo" className="logo" height="200"/></NavLink>
                <nav className="navBar">
                    <ul className="nav-ul">
                        <li className="nav-li"><NavLink to="/angebot">Angebot</NavLink></li>
                        <li className="nav-li"><NavLink to="/ueber-uns">Über uns</NavLink></li>
                        <li className="nav-li"><NavLink to="/repertoire">Repertoire</NavLink></li>
                        <li className="nav-li"><NavLink to="/aufnahmen">Aufnahmen</NavLink></li>
                        <li className="nav-li"><NavLink to="/kontakt">Kontakt</NavLink></li>
                        <li className="nav-li"><NavLink to="/links">Links</NavLink></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

function Footer() {
    return(
        <div>
            <footer>
            <div class="contact">
              <p>Purple Diamonds  |  <a href="mailto:purple.d.music@gmail.com">purple.d.music@gmail.com</a></p>
            </div>
            <div class="socialMedia">
              <a href="https://www.instagram.com/___purplediamonds___/"><img src={insta} alt="Instagram"/></a>
              <a href="https://de-de.facebook.com/purple.d.music"><img src={facebook} alt="Facebook"/></a>
            </div>
            </footer>
        </div>
    );
}

export default function App() {
    return(
        <div className="background">
        <div className="burger-container"><BurgerMenu /></div>
          <div id="page-wrap">
            <NavBar />
            <Contents />
            <Footer />
          </div>
        </div>
    );
}
