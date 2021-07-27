import React from "react";
import "../css/title.css";
import { store } from "../store/index.jsx";
import semirect from '../img/semirect.svg';

class TitleUsers extends React.Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        return (

            <div>
                <div className="Title">
                    <img src={semirect} className="semirect" alt=""/>
                    <p className="Title-text">{props.text}</p>
                </div>
            </div>
        );
    }

}

export { TitleUsers };