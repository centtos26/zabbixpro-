import React, { Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery'; 
import Login from './components/Login';
import { statement } from '@babel/template';
import Host from './components/Host';
import Banner from './components/Banner';
import { BrowserRouter as Router, Route, Link, Redirect, Switch  } from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Token: "",
      IsLogin: false,
      user: "",
      password: "",
      Hosts: [
        {
          "hostid": "",
          "host": "",
          "interfaces": [
              {
                  "interfaceid": "",
                  "ip": ""
              }
          ]
        }
      ],
      UserData: [
        {
          "jsonrpc": "",
          "result": {
              "userid": "",
              "alias": "",
              "name": "",
              "surname": "",
              "url": "",
              "autologin": "",
              "autologout": "",
              "lang": "",
              "refresh": "0",
              "type": "",
              "theme": "",
              "attempt_failed": "0",
              "attempt_ip": "",
              "attempt_clock": "",
              "rows_per_page": "",
              "debug_mode": true,
              "userip": "",
              "sessionid": "",
              "gui_access": ""
          },
          "id": 1
        }
      ]
    }
  }
  obtenerTokenHosts = () => {
    const { history } = this.props;
    var pObtenerToken = new Promise((resolve,reject) => {
        this.obtenerToken(resolve);
    });
    pObtenerToken.then(() => {
          this.obtenerUserData();
      var pObtenerHosts = new Promise((resolve,reject) => {
            this.obtenerHosts(resolve);
        });
        pObtenerHosts.then(() => {
          this.setState({IsLogin: true});
        });
    });
  }
  obtenerToken = (resolve) => {
    var zabbixAPI = "http://192.168.1.142/zabbix/api_jsonrpc.php";
    var req = {
      "jsonrpc": "2.0",
      "method": "user.login",
      "params": {
          "user": "Admin",
          "password": "zabbix"
      },
      "id": 1,
      "auth": null
    };
    $.ajax({
      type: 'POST',
      data: JSON.stringify(req),
      contentType: 'application/json',
      url: zabbixAPI,
      success: (data) => {
          this.setState({Token: data.result});
          console.log(data.result);
          resolve();
      },
      error: (data) => {
          alert(data);
      }
    });
  }
  obtenerSesion = (resolve) => {
    var zabbixAPI = "http://192.168.1.142/zabbix/api_jsonrpc.php";
    var req = {
      "jsonrpc": "2.0",
      "method": "user.login",
      "params": {
          "user": "Admin",
          "password": "zabbix"
      },
      "id": 1,
      "auth": null
    };
    $.ajax({
      type: 'POST',
      data: JSON.stringify(req),
      contentType: 'application/json',
      url: zabbixAPI,
      success: (data) => {
          this.setState({Token: data.result});
          resolve();
      },
      error: (data) => {
          alert(data);
      }
    });
  }
  obtenerHosts = (resolve) => {
    var zabbixAPI = "http://192.168.1.142/zabbix/api_jsonrpc.php";
    var req = {
        "jsonrpc": "2.0",
        "method": "host.get",
        "params": {
            "output": [
                "hostid",
                "host"
            ],
            "selectInterfaces": [
                "interfaceid",
                "ip"
            ]
        },
        "id": 2,
        "auth": this.state.Token
    };
    $.ajax({
      type: 'POST',
      data: JSON.stringify(req),
      contentType: 'application/json',
      url: zabbixAPI,
      success: (data) => {
        console.log(data.result)
          this.setState({Hosts: data.result});
          resolve();
      },
      error: (data) => {
          alert(data);
      }
    });
  }
  obtenerUserData = () => {
    var zabbixAPI = "http://192.168.1.142/zabbix/api_jsonrpc.php";
    var req = {
        "jsonrpc" :  "2.0" ,
         "method" :  "user.login" ,
         "params" :  { 
            "user" :  "Admin" ,
             "password" :  "zabbix" ,
             "userData" :  true 
        } ,
         "id" :  1 
    };
    $.ajax({
      type: 'POST',
      data: JSON.stringify(req),
      contentType: 'application/json',
      url: zabbixAPI,
      success: (data) => {
          console.log(data.result);
          this.setState({UserData: data.result});
          //resolve();
      },
      error: (data) => {
          alert(data);
      }
    });
  }
  cerrarSesion = () => {
    var zabbixAPI = "http://192.168.1.142/zabbix/api_jsonrpc.php";
    var req = {
        "jsonrpc": "2.0",
        "method": "user.logout",
        "params": [],
        "id": 1,
        "auth": this.state.Token
    };
    $.ajax({
      type: 'POST',
      data: JSON.stringify(req),
      contentType: 'application/json',
      url: zabbixAPI,
      success: (data) => {
          this.setState({IsLogin: false});
          this.obtenerUserData();
      },
      error: (data) => {
          alert(data);
      }
    });
  }
  render() {
    
    return (
      <Router>
        <Switch>
          <Route exact path="/login" render={() => {
            return(
              <div className="row">
              <div className="col-md-8">
                <div className="App">
                  <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                      Hola, Bienvenido al portal zabbix con react
                    </p>
                    <a
                      className="App-link"
                      href="https://reactjs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn React
                    </a>
                  </header>
                </div>
              </div>
              <div className="col-md-4">
                <Login obtenerTokenHosts={this.obtenerTokenHosts} isLogin={this.state.IsLogin}></Login>
              </div>
            </div>
            )
          }}/>
          <Route exact path="/hosts" render={() => {
            return(
              <div>
                <Banner cerrarSesion={this.cerrarSesion}></Banner>
                <div className="row">
                  <div className="col-md-12">
                    <Host hosts={this.state.Hosts} isLogin={this.state.IsLogin}></Host>
                  </div>
                </div>
              </div>
            )
          }}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
