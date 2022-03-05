import './Login.scss';
import { Redirect, useHistory, Link } from 'react-router-dom'
import React, { useState, useEffect, Props} from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ToastAlerts from "../../Utils/ToastAlerts/ToastAlerts"
import axios from "axios";

import Dashboard from "../../Dashboard/Dashboard"

import myAxios from "../../Axios/Axios"

interface LoginProps {
}

interface LoginState {
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
            let ax = new myAxios(
            {
              method: "GET",
              ressource: "/user/:id",
              email: this.state.email,
              password: this.state.password
            })

            let res = ax.login();
        }

        render()
        {
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
