import { Module } from '@nestjs/common';
import { AutobotsSocketService } from './autobots-socket.service';
import { AutobotsSocketGateway } from './autobots-socket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/posts/entities/post.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { Autobot } from 'src/autobots/entities/autobot.entity';
import { AutobotsService } from 'src/autobots/autobots.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, CommentEntity, Autobot])],
  providers: [AutobotsSocketGateway, AutobotsSocketService, AutobotsService],
})
export class AutobotsSocketModule {}
