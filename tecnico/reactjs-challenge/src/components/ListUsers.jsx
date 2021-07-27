import React from 'react';
import "../css/usuario.css";
import "../css/listusers.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { store } from "../store/index.jsx"
import semirect from '../img/semirect.svg';
import { Link } from 'react-router-dom';


class ListItem extends React.Component {

    render() {
        const props = this.props;
        return (
            <div>
                <Link to={"/u/"+props.usuario.login}>
                <div className="Item">
                    <img src={semirect} className="semirect2" alt="" />
                    <img className="Avatar2" src={props.usuario.avatar_url} alt="Avatar" />
                    <p className="nickname2">{"#" + props.usuario.login}</p>
                    <svg className="right-icon"><FontAwesomeIcon icon={faArrowRight} /></svg>
                </div>
                </Link>
            </div>
        );
    }
}

class ListUsers extends React.Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    async getUsers(role) {
        const username = store.getState().login.usuario;
        const validate = store.getState().login.valido;
        const octokit = store.getState().octokit;
        if (username && validate) {
            try {
                await octokit.request('GET /users/{username}/{role}', {
                    username: username,
                    role: role
                }).then((resp) => {

                    store.dispatch({
                        type: "TEMP_LIST",
                        response: resp.data,
                        role : role
                    });
                });
            } catch (error) {
                console.error(error);
            }
        }

    }

    render() {
        const temp = store.getState().temp;
        if (temp.role !== this.props.role){
            this.getUsers(this.props.role);
        }
        const usuario = store.getState().usuario;
        return (
            <div>
                <header className="List-header">
                    <Link to="/"><svg className="left-icon"><FontAwesomeIcon icon={faArrowLeft} /></svg></Link>
                    <p className="user-count">{usuario[temp.role]}</p><p className="user-title">{(temp.role==="following"?" Seguindo":" Seguidores")}</p>
                        
                </header>
                <div className="List">
                    {usuario[temp.role] > 0 && temp.response.map((user,index) => { return (<ListItem usuario={user} key={index}/>); })}
                </div>
            </div>
        );
    }

}
export { ListUsers };