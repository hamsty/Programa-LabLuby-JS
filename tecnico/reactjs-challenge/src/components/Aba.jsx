import React from 'react';
import { NavLink } from 'react-router-dom';
import "../css/aba.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Aba extends React.Component {
    
    render() {
        const props = this.props;
        return (
        <NavLink exact className="link" to={props.to} activeClassName="selected">
            <svg className="icon">
                <FontAwesomeIcon icon={props.icon} />
            </svg>
            <p className="text">{props.name}</p>
        </NavLink>)
    }
}

export {Aba}