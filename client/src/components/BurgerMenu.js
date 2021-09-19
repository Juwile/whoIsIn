import React from "react";
import { stack as Menu } from "react-burger-menu";

export default props => {
    return (
        <Menu>
            <a className="menu-item" href="/">
                Home
            </a>
            <a className="menu-item" href="/projects">
                Projects
            </a>
            <a className="menu-item" href="/profiles">
                Teammates
            </a>
        </Menu>
    );
};
