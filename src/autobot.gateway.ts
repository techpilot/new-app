import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AutobotsService } from './autobots/autobots.service';

@WebSocketGateway({ cors: '*' })
export class AutobotGateway {
  constructor(private readonly autobotsService: AutobotsService) {}

  @WebSocketServer()
  server: Socket;

  updateAutobotCount(count: number) {
    this.server.emit('autobotCount', count);
  }
}
