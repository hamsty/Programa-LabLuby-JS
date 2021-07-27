import { createStore, combineReducers } from "redux";
import {usuario} from "./usuario.jsx";
import {login} from "./login.jsx";
import {octokit} from "./octokit.jsx";
import {temp,temp_user, temp_repos} from "./temp.jsx";

const reducers = combineReducers({
    login,
    usuario,
    octokit,
    temp,
    temp_user,
    temp_repos
});

const store = createStore(reducers);
export { store };
