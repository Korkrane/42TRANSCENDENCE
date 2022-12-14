import React, { useEffect, useState } from 'react';
import './Auth.scss';
import Header from "../Header/Header";
import FourtyTwo from "./42Auth/42Auth";

//Pour tests
import Signup from './Signup/Signup';
import Login from './Login/Login';

export default function Auth() {

    const  [load, setLoad] = React.useState(false);

    useEffect(() => {
        setLoad(true);
        if (localStorage.getItem("loggedIn") == "true") {
            if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
                window.top.location = "http://localhost:3030/settings";
            else
                window.top.location = "http://".concat(process.env.REACT_APP_IP).concat(":3030/settings");
        }

        return () => { setLoad(false)};

    }, []);

    return (
        <>
            <Header />
            <div className="container" id="auth-container">
                <div className="row d-flex justify-content-center">
                    {localStorage.getItem("loggedIn") != "true" ?
                        <>
                            <div id="auth-form-div" className="col-8">
                                <div id="auth--form1" className="row d-flex justify-content-center">
                                    {/* <br /> */}
                                    <div id="form--auth1" className="row d-flex justify-content-center">
                                        <p id="jouer">Pour jouer, vous devez vous authentifier 🏓 </p>
                                        <p style={{color: "grey", textAlign: "center"}}><i>42 Auth has been commented for testing purposes</i></p>
                                        {/* <FourtyTwo /> */}
                                        <br />
                                        <Signup />
                                        <br />
                                        <Login />
                                    </div>
                                </div>
                            </div>
                        </>
                        : <p></p>}
                </div>
            </div>
        </>
    );
}
