import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { AutobotsService } from '../autobots/autobots.service';
import { Socket } from 'socket.io';
import { Cron } from '@nestjs/schedule';

@WebSocketGateway({ cors: '*' })
export class AutobotsSocketGateway {
  @WebSocketServer()
  server: Socket;

  constructor(private readonly autobotsService: AutobotsService) {}

  //  Runs every hour to create bot and updates bots count to the client in real-time
  @Cron('0 0 * * * *')
  async handleCron() {
    await this.autobotsService.createAutobots();
    const autobotCount = await this.autobotsService.getAutobotsCount();
    this.server.emit('autobotCount', autobotCount);
  }
}
