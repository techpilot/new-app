import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { AutobotsService } from 'src/autobots/autobots.service';
import { Socket } from 'socket.io';
import { Cron } from '@nestjs/schedule';

@WebSocketGateway({ cors: '*' })
export class AutobotsSocketGateway {
  @WebSocketServer()
  server: Socket;

  constructor(private readonly autobotsService: AutobotsService) {}

  // Runs every hour to create bot and updates bots count to the client in real-time
  @Cron('0 0 * * * *')
  async handleCron() {
    const createBots = await this.autobotsService.createAutobots();
    this.server.emit('autobotCount', createBots);
  }
}
