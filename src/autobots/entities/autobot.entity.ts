import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity()
export class Autobot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => PostEntity, (post) => post.autobot)
  posts: PostEntity[];
}
