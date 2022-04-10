import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from "@nestjs/common";
import { GameService } from './game.service';

let MatchMaking = [];

@WebSocketGateway({ namespace: 'game', cors: true })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server;

	private logger: Logger = new Logger("GameGateway");

	constructor(
		private readonly gameService: GameService
	) { }

	afterInit(server: Server) {
		this.logger.log("game socket init !");
	}

	async handleConnection(socket: Socket, ...args: any[]) {
		this.logger.log("Client connected: " + socket.handshake.query.username + ' id: ' + socket.id + ')');
	}

	async handleDisconnect(socket: Socket, ...args: any[]) {
		this.logger.log("Client disconnected: " + socket.handshake.query.username + ' id: ' + socket.id + ')');
	}

	@SubscribeMessage('search')
	async messageMessage(@ConnectedSocket() socket: Socket, @MessageBody() body: boolean) {
		if (body == true && socket.handshake.query.username) {
			MatchMaking.push(socket.handshake.query.username);
			console.log(socket.handshake.query.username + " a rejoint la file d'attente !")
			console.log("File d'attente: " + MatchMaking);
		} else if (body == false && socket.handshake.query.username) {
			const index = MatchMaking.indexOf(socket.handshake.query.username);
			if (index > -1) {
				MatchMaking.splice(index, 1);
			}
			console.log(socket.handshake.query.username + " a quitté la file d'attente !")
			console.log("File d'attente: " + MatchMaking);
		}

		if (socket.handshake.query.username && MatchMaking.length >= 2)
		{
			var index = MatchMaking.indexOf(socket.handshake.query.username);
			if (index > -1) {
				MatchMaking.splice(index, 1);
			}
			let adversaire = MatchMaking[0];
			index = MatchMaking.indexOf(adversaire);
			if (index > -1) {
				MatchMaking.splice(index, 1);
			}
			this.server.emit('gameStart', socket.handshake.query.username, adversaire);
			console.log("Une partie commence avec " + socket.handshake.query.username + " VS " + adversaire)
		}
	}  

	@SubscribeMessage('gameEnd')
	async gameEnd(@ConnectedSocket() socket: Socket, @MessageBody() body: string) {
		const b = body.split(':');
		console.log("winner: ", b[0], "loser", b[1], "winner score: ", b[2], "loser score: ", b[3])
		if (b[0] && b[1])
			this.gameService.createGame(b[0], b[1], Number(b[2]), Number(b[3]));
	}

	@SubscribeMessage('playerMove')
	async playerMove(@ConnectedSocket() socket: Socket, @MessageBody() body: string) {
		const b = body.split(':');
		this.server.emit('playerMove', body);
		console.log("joueur: " + b[0] + ", position : " + b[1]);
	}  


}