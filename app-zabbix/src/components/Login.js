import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery'; 

class Login extends React.Component {
    constructor(props) {
        super(props);  
      }
    functionHost = e => {
        var user = $('#user').val();
        var pass = $('#pass').val();
        if(!(user == "Admin" && pass == "zabbix")){
            alert("Credenciales incorrectas")
            return false;
        }
        this.props.obtenerTokenHosts();
     }
     render() {
        if (this.props.isLogin == true) {
            return (<Redirect to={'/hosts'}/>)
        }
        return (
        <div >
                <h1>BTECH Integrando soluciones</h1>
            <form>
            <div class="form-group">
                <label for="user">User</label>
                <input type="text" class="form-control" id="user" placeholder="Enter user"/>
            </div>
            <div class="form-group">
                <label for="pass">Password</label>
                <input type="password" class="form-control" id="pass" placeholder="Password"/>
            </div>
            <button type="button" class="btn btn-primary" onClick={this.functionHost}>Login</button>
            </form>
        </div>
        );
      }
}

export default Login;