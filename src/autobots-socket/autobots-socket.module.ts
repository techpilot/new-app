import { Module } from '@nestjs/common';
import { AutobotsSocketService } from './autobots-socket.service';
import { AutobotsSocketGateway } from './autobots-socket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../posts/entities/post.entity';
import { CommentEntity } from '../comments/entities/comment.entity';
import { Autobot } from '../autobots/entities/autobot.entity';
import { AutobotsService } from '../autobots/autobots.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, CommentEntity, Autobot])],
  providers: [AutobotsSocketGateway, AutobotsSocketService, AutobotsService],
})
export class AutobotsSocketModule {}
