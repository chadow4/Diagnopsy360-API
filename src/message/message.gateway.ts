import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessageService } from "./message.service";
import { MessageSocketDto } from "./message.dto";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    credentials: true
  }
})
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private readonly messageService: MessageService
  ) {
  }

  @WebSocketServer()
  server: Server;
  users: Map<string, number> = new Map();

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.users.delete(client.id);
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("join")
  handleJoin(client: Socket, userId: number): void {
    this.users.set(client.id, userId);
  }

  @SubscribeMessage("message")
  async handleMessage(client: Socket, messsage: MessageSocketDto): Promise<void> {
    await this.messageService.createMessage(messsage.authorId, messsage.content, messsage.diagnosisId);
    this.server.emit("newMessage", messsage);
  }
}
