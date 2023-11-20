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

  // Map pour associer userId à socketId
  users: Map<number, string> = new Map();

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const userIdToDelete = [...this.users.entries()]
      .find(([_, socketId]) => socketId === client.id)?.[0];
    if (userIdToDelete) {
      this.users.delete(userIdToDelete);
    }
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("join")
  handleJoin(client: Socket, userId: number): void {
    this.users.set(userId, client.id);
  }

  @SubscribeMessage("message")
  async handleMessage(client: Socket, message: MessageSocketDto): Promise<void> {
    await this.messageService.createMessage(message.authorId, message.content, message.diagnosisId);

    const destinationSocketId = this.users.get(message.destinationId);

    client.emit("newMessage", message);

    if (destinationSocketId) {
      this.server.to(destinationSocketId).emit("newMessage", message);
    }
  }
}
