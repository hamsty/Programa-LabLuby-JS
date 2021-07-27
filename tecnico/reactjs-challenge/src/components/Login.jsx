import logo from '../img/logo.svg';
import '../css/login.css';
import React from 'react';
import { UserText } from './UserText.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { store } from "../store/index.jsx";

class Login extends React.Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className="Login-header">
        <img src={logo} className="Login-logo" alt="logo" />
        <UserText />
        <button className="EntrarButton" onClick={async (e) => {
          const octokit = store.getState().octokit;
          const username = store.getState().login.usuario;
          const typed = store.getState().login.typed;
          if (username && typed) {
            try {
              const response = await octokit.request('GET /users/{username}', {
                username: username
              });
              const disp = {
                ...response.data, ...{
                  type: "LOGIN"
                }
              };
              store.dispatch(
                {
                  type: "VALIDATE"
                }
              );
              store.dispatch(disp);
            } catch (erro) {
              alert("Usuário não existe");
            }

          }
        }}>ENTRAR <svg className="arrow-icon"><FontAwesomeIcon icon={faArrowRight} /></svg></button>
      </div>
    );
  }
}

export { Login };
