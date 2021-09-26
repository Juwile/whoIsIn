import React, {Component} from 'react';


class Impressum extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null // keeps track off which book is clicked on (for eventlistener onclick)
        }
    }

    render() {
        return (
            <div className="main detailpage">
            <div className="h1-grid">
              <h1 className="h1class">Impressum</h1>
              <p>Nadine Mülhauser</p>
              <p>nadine.muelhauser@gmail.com</p>
            </div>
            </div>
        );
    }
}

export default (Impressum); // inside ProjectList we have access to data from query via this.props
