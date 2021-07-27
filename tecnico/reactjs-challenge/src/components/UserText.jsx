import React from "react";
import "../css/login.css";
import { store } from "../store/index.jsx";

class UserText extends React.Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const typed = store.getState().login.typed;
        return (
            
            <div>
                <input className="UserText-input" type="text" placeholder="Usuário" onChange={(e)=>{
                    const value = e.target.value.trim();
                    let typed = true;
                    if (value === ""){
                        typed = false
                    }
                    store.dispatch({
                        type: 'TYPED',
                        usuario: value,
                        typed: typed
                    })
                }}/>
                <label className={"UserText-error "+(typed && ("hidden"))} >Campo obrigatório</label>
            </div>
        );
    }

}

export { UserText };