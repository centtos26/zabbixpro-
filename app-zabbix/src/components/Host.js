import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

class Host extends React.Component {
    constructor(props) {
        super(props); 
      }
     render() {
        if (this.props.isLogin == false) {
            return (<Redirect to={'/Login'}/>)
        }
        const hosts = this.props.hosts.map((item,key) => {
            return (
            <tr key={key}>
                <td className="text-center">{item.hostid}</td>
                <td className="text-center">{item.host}</td>
                <td className="text-center">{item.interfaces.interfaceid}</td>
                <td className="text-center">{item.interfaces.ip}</td>
              </tr>
        )});
        return(
            <div>
                <h1>Hola, estos son los host disponibles</h1>
            <table className="table table-hover">
          <thead className="cabecera text-nowrap">
            <tr>
                <th className="text-center">Host_id</th>
              <th className="text-center">Host</th>
              <th className="text-center">Interface_id</th>
              <th className="text-center">Interface_ip</th>
            </tr>
          </thead>
          <tbody>
            { hosts }
          </tbody>
        </table>
        </div>
        )
      }
}

export default Host;