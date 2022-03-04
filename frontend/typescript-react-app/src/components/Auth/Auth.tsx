import React from 'react';
import './Auth.scss';

import Header from "../Header/Header";
import Login from "./Login/Login"
import Signup from "./Signup/Signup"

// import { useNavigate } from "react-router-dom";


export default function Auth() {

    // let navigate = useNavigate();
    // const routeChange = () => {
    //     let path = `/dashboard`;
    //     navigate(path);
    // };

    // const [showPass, setshowPass] = useState(false);
    // const [showPassConfirm, setshowPassConfirm] = useState(false);
    // const [showPassBis, setshowPassBis] = useState(false);

    //Confetti
    // const { width, height } = useWindowSize();

    return (
        <>
            <Header />
            <div className="container" id="auth-container">
                <div id="auth-form-div">
                    <div id="auth--form1" >
                        <div id="form--auth1" className="forms">
                            <h2>Bienvenue ! </h2>
                            <p>Pour jouer, vous devez vous authentifier 🏓</p>
                            <div id="formAuth42">
                                <button
                                  type="submit"
                                  className="btn btn-dark btn-block"
                                  id="auth-btn-3"
                                  // onClick={routeChange}
                                  >
                                    Authentification 42
                                </button>
                            </div>
                            <Signup />
                    </div>
                        <Login />
                    </div>
                </div>
            </div>
        </>
    );
}
