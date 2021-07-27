import React from 'react';
import { store } from "../store/index.jsx";
import { TitleUsers } from './TitleUsers.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faSignInAlt} from "@fortawesome/free-solid-svg-icons"
import "../css/usuario.css"
import { Info } from "./Info.jsx"
import { Link } from 'react-router-dom';


class Usuario extends React.Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
    
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  async getUser() {
    const octokit = store.getState().octokit;
    try {
      const response = await octokit.request('GET /users/{username}', {
        username: this.props.user
      });
      const disp = {
        ...response.data, ...{
          type: "TEMP_USER"
        }
      };
      store.dispatch(disp);


    } catch (erro) {
      alert("Usuário não existe");
    }
  }

  render() {
    let usuario = null;
    if (this.props.user !== "default") {
      if (!store.getState().temp_user || this.props.user !== store.getState().temp_user.login) {
        this.getUser();
      }
      usuario = store.getState().temp_user;
    }else{
      usuario = store.getState().usuario;
    }
    return (
      <div>
        {usuario && <section>
          <header className="User-header">
            <p className="nickname">{"#" + usuario.login}</p>
            <Link to="/" className={this.props.user === "default"?"":"hidden"} onClick={(e) => {
              store.dispatch({
                type: "LOGOUT"
              })
            }}>
              <p className="sout-label">Sair</p>
              <svg className="sout-icon"><FontAwesomeIcon icon={faSignOutAlt} /></svg>
            </Link>
            <Link to="/" className={this.props.user !== "default"?"":"hidden"} onClick={async (e) => {
              store.dispatch({
                type: 'TYPED',
                usuario: usuario.login,
                typed: true
              })
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
            }}>
              <p className="sin-label">Salvar</p>
              <svg className="sin-icon"><FontAwesomeIcon icon={faSignInAlt} /></svg>
            </Link>
          </header>
          <section>
            <img className="Avatar" src={usuario.avatar_url} alt="Avatar" />
            {usuario.name && <TitleUsers class="UserName" text={usuario.name} />}
            <p className="info">{usuario.email}<br />{usuario.location}</p>
            <div className="moreinfo">
              <Info to="/seguidores" name="Seguidores" value={usuario.followers} linked={this.props.user === "default"}/>
              <Info to="/seguindo" name="Seguindo" value={usuario.following} linked={this.props.user === "default"}/>
              <Info to="/repos" name="Repos" value={usuario.repos} linked={this.props.user === "default"}/>
            </div>
            {usuario.bio && <div><TitleUsers className="bio-title" text="BIO" />
              <p className="bio">{usuario.bio}</p>
            </div>}
          </section>

        </section>}
      </div>
    );
  }
}

export { Usuario };