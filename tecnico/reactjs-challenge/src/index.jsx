import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { Login } from './components/Login.jsx';
import { Usuario } from './components/Usuario.jsx';
import { BrowserRouter as Router, Route, Switch, useParams} from 'react-router-dom';
import { store } from "./store/index.jsx";
import { Aba } from "./components/Aba.jsx"
import { faHome, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { ListUsers } from './components/ListUsers.jsx';
import { ListRepos } from './components/ListRepos.jsx';

class App extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const login = store.getState().login;
    const TempUser = ()=>{
      const {user} = useParams();
      return (<Usuario user={user}/>);
    }
    return (
      <Router>
        <section >
          {login.valido && <div>
            <Switch>
              <Route exact={true} path="/" >
                <Usuario user="default" />
              </Route>
              <Route exact={true} path="/seguidores" >
                <ListUsers role="followers" />
              </Route>
              <Route exact={true} path="/seguindo" >
                <ListUsers role="following" />
              </Route>
              <Route exact={true} path="/repos" >
                <ListRepos/>
              </Route>
              <Route path="/u/:user" component={TempUser}>
              </Route>
            </Switch>
            <footer>
              <nav className="tabs">
                <Aba icon={faHome} name="Home" to="/" />
                <Aba icon={faGithub} name="Repos" to="/repos" />
                <Aba icon={faUserFriends} name="Seguidores" to="/seguidores" />
                <Aba icon={faUserFriends} name="Seguindo" to="/seguindo" />
              </nav>
            </footer>
          </div>}
          {!login.valido && <Route exact={true} path="/" component={Login} />}

        </section>

      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
