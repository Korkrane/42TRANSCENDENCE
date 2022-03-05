import './Login.scss';
import { Redirect, useHistory, Link } from 'react-router-dom'
import React, { useState, useEffect, Props} from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ToastAlerts from "../../Utils/ToastAlerts/ToastAlerts"
import axios from "axios";

import Dashboard from "../../Dashboard/Dashboard"

interface LoginProps {
  //voir si la personne est deja connectee ?
}

interface LoginState {
  //voir si la personne est deja connectee ?
  email?: string,
  password?: string,
  isLogged?: boolean
}

export default class Login extends React.Component<LoginProps, LoginState>
{
        constructor(props: LoginProps)
        {
            super(props);
            
            //Init state
            this.state = {
              email: "",
              password: "",
              isLogged: false
            }
        }

        submit=(event)=>
        {
            event.preventDefault();
            axios.defaults.baseURL = 'http://localhost:3000/';
            axios.defaults.headers.post['Content-Type'] ='*';
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

            const bod = {
                email: this.state.email,
                password: this.state.password,
            }

            const headers = {
                'Content-Type': 'application/json'
            };

            let toast = new ToastAlerts(null);
            console.log(bod);
            let self = this;
            let res = axios.post('http://localhost:3000/api/auth/log-in/', bod, {headers})
            .then(res=>{
                console.log(res.data);
                console.log(res.status);
                console.log(res);
                if (res.status == 200)
                {
                    console.log(res);
                    this.setState({isLogged: true});
                    console.log(this.state.isLogged);
                    window.top.location = "/user/";
                }
                else
                {
                    toast.notifyDanger('Oops ! An error happened');
                }
            })
            .catch(function (error) {
              console.log(error);
              toast.notifyDanger('Oops ! An error happened');
            })
        }

        render()
        {
          // if (this.state.isLogged)
          // {
          //   // redirect to home if signed up
          //   return <Redirect to = {{ pathname: "/dashbard" }} />;
          // }
          //else
          //{
            return (
                <div>
                    <h3 id="se-connecter">Se connecter</h3>
                    <div id="formBasicEmail">
                      <label>Email</label>
                      <input className="form-control" type="email"
                        placeholder="malatini"
                        //value={this.state.email.bind(this)}
                        value={this.state.email}
                        onChange={(e)=>{this.setState({email: e.target.value})}}
                      />
                    </div>

                  <div id="formBasicPassword">
                    <label>Mot de passe</label>
                    <input
                      className="form-control"
                      type="password"
                      /*type={showPassBis ? "text" : "password"}*/
                      placeholder="********"
                      //value={this.state.password.bind(this)}
                      value={this.state.password}
                      onChange={(e)=>{this.setState({password: e.target.value})}}
                    />
                  <div style={{ textAlign: "right" }} id="show-password">
                  </div>
                </div>
              <p id="connect-p"></p>
              <hr className="my-4" id="me-connecter_hr"></hr>
              <div id="formBasicConnexion">
              <button
                type="submit"
                className="btn btn-light btn-block"
                id="auth-btn-1"
                onClick={this.submit}
                >
                Me connecter

              </button>

          </div>
        </div>
    );
}
}
