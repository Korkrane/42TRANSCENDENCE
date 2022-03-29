import './Channels.scss';
import Nav from '../Nav/Nav';
import TypingMessage from "./TypingMessage/TypingMessage";
import ListDiscussions from "./ListDiscussions/ListDiscussions";
import ListParticipant from './ListParticipant/ListParticipant';
import React from "react";
import MyAxios from '../Utils/Axios/Axios';
import ToastAlerts from '../Utils/ToastAlerts/ToastAlerts';
import { ToastContainer, toast } from 'react-toastify';
import { useCookies } from "react-cookie";
import Cookies from 'universal-cookie';
//import GetCookie from '../Utils/Hooks/getCookie';

//import { Cookies } from "react-cookie"
//import Cookie from 'js-cookie'
//import { w3cwebsocket} from "websocket";
//import io from "socket.io-client";


/**
 * @malatini ou @macrespo
 * Page principale pour afficher les channels, voir les sous composants
*/

export interface ChatProps {
    username?: string
}

/*
export interface ChatState {
}
//const socket = io("http://localhost:4000");
//const message = document.getElementById('message');
*/

export default function Channels(props: ChatProps) {

    //const [cookies, setCookie] = useCookies();
    const cookies = new Cookies();
    function createChat()
    {
        //Initialisation de notre classe MyAxios (sans prop)

        //Retrieve chats

        let ax = new MyAxios(null);
        //let cook = cookies.get('Authentication');
        //console.log(cook);
        //console.log(cookies.user);
        //console.log("authentication is " + cookies.authentication);

        let res = ax.get_api_user_cookie_test();

        //Creating chat
        //let res = ax.post_api_chat("pass!1717", true, "chat-6");
    }

    //render()
    //{
        return (
            <div id="channels">
                <Nav />
                <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
                <div className="container" id="chat--container">
                    <div className="row d-flex justify-content-center text-center">
                        <div className="col-7">
                            <h1 id="channels--tile">Channels</h1>
                            <button onClick={createChat}>Create chat</button>
                            {/* <p>{this.cookies}</p> */}
                            <h2 id="websocket--tile">Websocket chat</h2>
                            <ListDiscussions />
                            <TypingMessage />
                        </div>
                        <div className="col-4" id="list--participants">
                            <ListParticipant />
                        </div>
                    {/* Components mes channels */}
                    {/* Component discussion */}
                    {/* Component participants */}
                    </div>
                </div>
            </div>
        );
    }
//}
