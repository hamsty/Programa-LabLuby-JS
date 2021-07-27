import React from 'react';

import "../css/listrepos.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,  faLockOpen, faLock } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { store } from "../store/index.jsx"
import semirect from '../img/semirect.svg';
import { Link } from 'react-router-dom';


class ListRepo extends React.Component {

    render() {
        const props = this.props;
        console.log(props.repo);
        return (
            <div className="Item-repo">
                <img src={semirect} className="semirect3" alt="" />
                <p className="nickname3">{"#" + props.repo.name}</p>
                <p className="bio1">{props.repo.description}</p>
                <div>
                    <svg className="star-icon"><FontAwesomeIcon icon={faStar} /></svg>
                    <p className="star-count">{props.repo.stargazers_count}</p>
                </div>
                <div>
                    {!props.repo.private && <svg className="locko-icon"><FontAwesomeIcon icon={faLockOpen} /></svg>}
                    {props.repo.private && <svg className="lockc-icon"><FontAwesomeIcon icon={faLock} /></svg>}
                </div>
            </div>
        );
    }
}

class ListRepos extends React.Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
        this.getRepos();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    async getRepos() {
        const username = store.getState().login.usuario;
        const validate = store.getState().login.valido;
        const octokit = store.getState().octokit;
        if (username && validate) {
            try {
                await octokit.request('GET /users/{username}/repos', {
                    username: username
                }).then((resp) => {

                    store.dispatch({
                        type: "TEMP_REPOS",
                        response: resp.data
                    });
                });
            } catch (error) {
                console.error(error);
            }
        }

    }

    render() {
        const temp = store.getState().temp_repos;
        const usuario = store.getState().usuario;
        return (
            <div>
                <header className="List-header-repo">
                    <Link to="/"><svg className="left-icon"><FontAwesomeIcon icon={faArrowLeft} /></svg></Link>
                    <p className="user-count">{usuario.repos}</p><p className="user-title">repositórios</p>

                </header>
                <div className="List-repo">
                    {usuario.repos > 0 && temp.map((repo, index) => { return (<ListRepo repo={repo} key={index} />); })}
                </div>
            </div>
        );
    }

}
export { ListRepos };