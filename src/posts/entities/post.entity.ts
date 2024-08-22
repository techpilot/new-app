// src/post.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CommentEntity } from '../../comments/entities/comment.entity';
import { Autobot } from '../../autobots/entities/autobot.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => Autobot, (autobot) => autobot.posts)
  autobot: Autobot;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
