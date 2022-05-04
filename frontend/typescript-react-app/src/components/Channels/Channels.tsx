import './Channels.scss';
import Nav from '../Nav/Nav';
import TypingMessage from "./TypingMessage/TypingMessage";
import ListDiscussions from "./ListDiscussions/ListDiscussions";
import ListParticipant from './ListParticipant/ListParticipant';
import CreateChan from './CreateChan/CreateChan';
import React, { useState, useEffect } from "react";
import MyAxios from '../Utils/Axios/Axios';
import ToastAlerts from '../Utils/ToastAlerts/ToastAlerts';
import { ToastContainer, toast } from 'react-toastify';
import { io } from "socket.io-client";
import ListChannels from './ListChannels/ListChannels';
import axios from 'axios';

interface ChatProps {
	username?: string
}

export default function Channels(props: ChatProps) {
	const calledOnce = React.useRef(false);
	const [username, setUsername] = React.useState("");
	const [load, setLoad] = React.useState(false);
	const [isChan, setIsChan] = React.useState(true);
	const [hasPass, setHasPass] = React.useState(false);
	const [activeID, setActiveID] = React.useState("");
	const [activeName, setActiveName] = React.useState("");
	const [hide, setHide] = React.useState(false);
	const [isBanned, setIsBanned] = React.useState(false);

	const [socket, setSocket] = React.useState(io("http://".concat(process.env.REACT_APP_IP).concat(":3000/chat"), { query: { username: username } }));

	function getUser() {
		let url = "";
		console.log("env var is " + process.env.REACT_APP_IP);
		if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
		{
			url = "http://localhost:3000/api/auth/";
			console.log("first condition !");
		}
		else
		{
			url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/auth/");
			console.log("second condition !");
		}
			
		console.log("called here !");
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;
		/*await*/

		console.log("url is " + url);
		
		axios.get(url)
			.then(res => {
				setUsername(res.data.login);
				if (process.env.REACT_APP_IP != undefined && process.env.REACT_APP_IP != "")
					setSocket(io("http://".concat(process.env.REACT_APP_IP).concat(":3000/chat"), { query: { username: username } }))
				else 
					setSocket(io("http://".concat("localhost").concat(":3000/chat"), { query: { username: username } }))
			})
			.catch((err) => {
				;
			})
		setLoad(true);
	}

	useEffect(() => {
		getUser();
	}, [username]);

	return (
		<div id="channels">
			<Nav />
			<div className="container" id="container_chat">
				<div className="row d-flex justify-content-center text-center" id="row_chat">
					{load === true ?
						<ListChannels
							socket={socket}
							login={username}
							setIsChan={setIsChan}
							setHasPass={setHasPass}
							setActiveID={setActiveID}
							setActiveName={setActiveName}
							setHide={setHide}
							setIsBanned={setIsBanned}
						/>
						: ""}
					{load === true ?
						<ListDiscussions
							socket={socket}
							login={username}
							isChan={isChan}
							activeID={activeID}
							activeName={activeName}
							hide={hide}
							setIsBanned={setIsBanned}
							isBanned={isBanned}
						/>
						: ""}
					{load === true ?
						<ListParticipant
							socket={socket}
							login={username}
							isChan={isChan}
							hasPass={hasPass}
							setHasPass={setHasPass}
							activeID={activeID}
							activeName={activeName}
							setHide={setHide}
							hide={hide}
							isBanned={isBanned}
						/>
						: ""}
				</div>
			</div>
		</div>
	);
}
