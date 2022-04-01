import './ListChannels.scss';
import React, {Component, useState, useEffect} from "react";
import Nav from "../../Nav/Nav";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import CreateChanModal from "../../Utils/Modal/Modal";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";

interface ListChat
{
	login?: string
}

/**
 * @malatini ou @macrespo ?
 * Pour la personne en charge du chat
 */
export default function ListChannels(props: ListChat) {
    //Toutes les channels
    const [channels, setChannels] = React.useState([]);
    const [count, setCount] = useState(0);

    function createChanneltest()
    {
        let body = {
            password: "test",
            public: true,
            name: "test"
        }

        let ax = new myAxios(null);
        ax.post_api_chat(body.name, body.public, body.pass);
    }

    function renderListChannels(login: string)
    {
        axios.defaults.withCredentials = true;
        let url = "http://localhost:3000/api/chat/";
        axios.get(url)
        .then( res => {
            let channels = res.data;
            //console.log(channels);
            setChannels(channels);
            //console.log(channels);
        })
        .catch((error) => {
            console.log("Error while getting all channels");
        })
    }

    useEffect(() => {
        createChanneltest();
        renderListChannels(props.login);
    }, []);

    //console.log(channels);

    return (
        <div id="listChannels">
                <div className="row">
                    <div className="col-3" id="channel--col">
                        <p id="list--channels--title"> Public channels :</p>
                            <ul id="list--channels--ul">
                                {channels.map(channel  =>
                                    <li className="channel--list">{channel.name}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            //</div>
    );
}
