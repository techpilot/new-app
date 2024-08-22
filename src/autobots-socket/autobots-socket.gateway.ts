import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { AutobotsSocketService } from './autobots-socket.service';
import { AutobotsService } from 'src/autobots/autobots.service';
import { Socket } from 'socket.io';
import { Cron } from '@nestjs/schedule';

@WebSocketGateway({ cors: '*' })
export class AutobotsSocketGateway {
  @WebSocketServer()
  server: Socket;

  constructor(
    private readonly autobotsSocketService: AutobotsSocketService,
    private readonly autobotsService: AutobotsService,
  ) {}

  @Cron('0 0 * * * *') // Runs every hour
  async handleCron() {
    await this.autobotsService.createAutobots();
  }

  async updateAutobotCount() {
    const autobotCount = await this.autobotsService.getAutobotsCount();
    this.server.emit('autobotCount', autobotCount);
  }
}
