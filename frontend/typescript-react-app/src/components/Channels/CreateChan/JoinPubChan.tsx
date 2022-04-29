import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import MyAxios from '../../Utils/Axios/Axios';
import { ToastContainer } from 'react-toastify';
import "./JoinPubChan.scss";

export interface JoinChanProps {
	endpoint?: any,
	action?: any,
	setExited?: any,
	setUpdate?: any,
	exited?: any
}
export default function JoinChan(props: JoinChanProps) {
	const [show, setShow] = React.useState(false);
	const [newPass, setNewPass] = React.useState("")
	const [show2, setShow2] = React.useState(false);
	const [isPublic, setPublic] = React.useState(Boolean);
	const [privatePass, setPrivatePass] = React.useState(String);
	const [publicPass, setPublicPass] = React.useState(String);
	const [privateToJoin, setPrivateToJoin] = React.useState(String);
	const [chanName, chanNameSet] = React.useState("");
	const [chanPassword, chanPasswordSet] = React.useState("");
	const [sucessfull, setSuccessfull] = React.useState(false);
	const [joignable, setJoignable] = React.useState([]);
	const [load, setLoad] = React.useState(false);
	const calledOnce = React.useRef(false);

	const displayPrivate = () => setPublic(false);
	const displayPublic = () => setPublic(true);
	const handleCloseFinale = () => {
		setShow(false);
	}

	const handleClose2 = () => setShow2(false);

	const handleClose = () => {
		setJoignable([]);
		setShow(false);
		return false;
	}

	React.useEffect(() => {
		//console.log("in join channel")
		;
	}, [])

	const handleExit = () => {

		let toast = new ToastAlerts(null);

		if (sucessfull == true) {
			props.setExited(!props.exited);
		}
		//else {
		//	console.log("Did not add anything")
		//}
	}

	function handleSend(chan: string) {
		let toast = new ToastAlerts(null);

		axios.defaults.withCredentials = true;
		let url = "http://localhost:3000/api/chat/join";

		let body = {
			"name": chan,
		}
		axios.post(url, body)
			.then(res => {
				toast.notifySuccess("You joined the channel");
				props.setUpdate(chan);
				setSuccessfull(true);
				handleClose();
			})
			.catch(error => {
				toast.notifyDanger("This channel already exists.");
			})
	}


	const handleShow = () => {
		getJoignableChans();
		setShow(true);
	}

	const getJoignableChans = () => {

		let url = "http://localhost:3000/api/chat/joinableChannels";

		axios.get(url)
			.then((res) => {
				let joignable = res.data;
				let len = joignable.length;
				let i = 0;
				while (i < len) {
					setJoignable(prevArray => [...prevArray, joignable[i]]);
					i++;
				}
				setLoad(true);

			})
			.catch((error) => {
				//console.log("Catched error while getting joignable.");
				;
			})
	}

	const handleJoinPrivate = () => {
		let toast = new ToastAlerts(null);

		axios.defaults.withCredentials = true;
		let url = "http://localhost:3000/api/chat/join";

		//console.log(privateToJoin + ": chan i want to join while im on private side")
		let body = {};
		if (privatePass.length <= 0) {
			body = {
				"name": privateToJoin,
			}
		}
		else {
			body = {
				"password": privatePass,
				"name": privateToJoin,
			}
		}
		axios.post(url, body)
			.then(res => {
				toast.notifySuccess("You joined the channel");
				props.setUpdate(privateToJoin);
				setSuccessfull(true);
				handleCloseFinale();
			})
			.catch(error => {
				toast.notifyDanger("Failed to join the channel.");
			})
	}

	const [form, setForm] = React.useState(false);

	function popForm() {
		let toast = new ToastAlerts(null);
		toast.notifyDanger("WIP, comment faire quand public + pass")
		setForm(true);
	}

	return (
		<div id="create-chan_div">
			<button type="button" className="btn"
				id="joinchan-button"
				onClick={handleShow}
				data-toggle="modal" data-target="#exampleModalCenter">Join channel</button>
			<Modal show={show} animation={true} onHide={handleClose} onExited={handleExit}>
				<Modal.Header>
					<Modal.Title id="create_title">Join a channel</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Modal.Title className="Category">
							<i className="categ" onClick={displayPublic} > Public</i>
							<i className="categ" onClick={displayPrivate} > Private</i>
						</Modal.Title>
						<br />
						{isPublic === true ?
							<ul className="wrapper list-group list-group-horizontal-lg">
								{load == true ?
									joignable.map(join =>
										<div key={join} className="joignable_chans">
											<i className="btn joignable" onClick={join.password ? () => popForm() : () => handleSend(join.name)}>{join.name}</i>
										</div>)
									:
									null
								}
								{
									form == true ?
										<Form.Group >
											<Form.Label>Password *</Form.Label>
										</Form.Group>
										: <div>lol</div>
								}
							</ul>
							:
							<>
								<Form.Group>
									<Form.Label>Channel Name *</Form.Label>
									<Form.Control
										type="text"
										value={privateToJoin}
										onChange={e => { setPrivateToJoin(e.target.value) }}
										autoFocus
										placeholder="channel"
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										value={privatePass}
										onChange={e => { setPrivatePass(e.target.value) }}
										autoFocus
										placeholder="******"
									/>
								</Form.Group>
								<Button variant="dark" type="submit" onClick={handleJoinPrivate}>
									Join Private Channel
								</Button>
							</>
						}
					</Form>
				</Modal.Body>
			</Modal >
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
		</div >
	);

}