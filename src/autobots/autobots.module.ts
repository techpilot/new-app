import { Module } from '@nestjs/common';
import { AutobotsService } from './autobots.service';
import { AutobotsController } from './autobots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../posts/entities/post.entity';
import { CommentEntity } from '../comments/entities/comment.entity';
import { Autobot } from './entities/autobot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, CommentEntity, Autobot])],
  controllers: [AutobotsController],
  providers: [AutobotsService],
})
export class AutobotsModule {}
