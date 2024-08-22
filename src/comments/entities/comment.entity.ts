// src/comment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  post: PostEntity;
}
