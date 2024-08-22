import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autobot } from './entities/autobot.entity';
import { PostEntity } from '../posts/entities/post.entity';
import { CommentEntity } from '../comments/entities/comment.entity';
import axios from 'axios';

@Injectable()
export class AutobotsService {
  private readonly logger = new Logger(AutobotsService.name);

  constructor(
    @InjectRepository(Autobot)
    private autobotsRepository: Repository<Autobot>,
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
  ) {}

  async createAutobots(): Promise<void> {
    try {
      for (let i = 0; i < 500; i++) {
        const { data: user } = await axios.get(
          'https://jsonplaceholder.typicode.com/users/1',
        );
        const autobot = this.autobotsRepository.create({
          name: `${user.name}-${i}`,
        });

        const createdAutobot = await this.autobotsRepository.save(autobot);

        for (let j = 0; j < 10; j++) {
          const { data: post } = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${j + 1}`,
          );
          const postEntity = this.postsRepository.create({
            title: `${post.title}-${i}-${j}`, // Ensure unique titles
            body: post.body,
            autobot: createdAutobot,
          });

          const createdPost = await this.postsRepository.save(postEntity);

          for (let k = 0; k < 10; k++) {
            const { data: comment } = await axios.get(
              `https://jsonplaceholder.typicode.com/comments/${k + 1}`,
            );
            const commentEntity = this.commentsRepository.create({
              body: comment.body,
              post: createdPost,
            });

            await this.commentsRepository.save(commentEntity);
          }
        }
      }

      this.logger.log('500 Autobots created successfully.');
    } catch (error) {
      this.logger.error('Error creating Autobots:', error.message);
    }
  }

  async getAutobotsCount(): Promise<number> {
    try {
      const autobots = await this.autobotsRepository.find();
      return autobots.length;
    } catch (error) {
      console.log(error);
    }
  }

  async getAutobots(limit: number): Promise<any[]> {
    try {
      const autobots = await this.autobotsRepository.find({
        take: limit,
      });
      return autobots;
    } catch (error) {
      console.log(error);
    }
  }

  async getAutobotPosts(id: number, limit: number): Promise<any[]> {
    try {
      const autobots = await this.postsRepository.find({
        take: limit,
      });
      return autobots;
    } catch (error) {
      console.log(error);
    }
  }

  async getPostComments(
    id: number,
    postId: number,
    limit: number,
  ): Promise<any[]> {
    try {
      const autobots = await this.commentsRepository.find({
        take: limit,
      });
      return autobots;
    } catch (error) {
      console.log(error);
    }
  }
}
