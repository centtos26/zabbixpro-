import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch  } from "react-router-dom";

class Banner extends React.Component {
    constructor(props) {
        super(props); 
      }
      cerrarSesion = e => {
        this.props.cerrarSesion();
     }
     render() {
        if (this.props.isLogin == false) {
            return (<Redirect to={'/Login'}/>)
        }
        return (
            <nav class="navbar navbar-light bg-light">
                <button type="button" className="navbar-brand" onClick={this.cerrarSesion}>LogOut</button>
                <h5>BTECH integrando soluciones</h5>
            </nav>
        );
      }
}

export default Banner;