import './Invitations.scss';
import React, {Component, useState, useEffect} from "react";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";

export default function Invitations() {
	const [invitations, Invitations] = React.useState([]);
    const [count, setCount] = useState(0);

	const calledOnce = React.useRef(false);

    function renderInvitations()
    {
        axios.defaults.withCredentials = true;
    }

	//Attention mon use effect est pas bon il recharge parfois des user
    useEffect(() => {
		if (calledOnce.current) {
			return;}
        renderInvitations();
    }, []);

    return (
		<div id="invitation-div">
			<div id="container--invitations">
				<h1 className="text" id="displaying">Invitations</h1>
				<br />
				<div className="row" id="row--users">
				</div>
			</div>
		</div>
		);
}