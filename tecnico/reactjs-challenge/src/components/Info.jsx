import React from 'react';
import { NavLink } from 'react-router-dom';
import "../css/info.css"

class Info extends React.Component {

    render() {
        const props = this.props;
        return (
            <div>
                {props.linked && <div className="linkpos"><NavLink className="linktext" exact={true} to={props.to} activeClassName="selected">
                    <p className="text1">
                        {props.value}
                    </p>
                    <p className="text2">{props.name}</p>
                </NavLink></div>}
                {!props.linked && <div className="linkpos linktext">
                    <p className="text1">
                        {props.value}
                    </p>
                    <p className="text2">{props.name}</p>
                </div>}
            </div>
        )
    }
}

export { Info }