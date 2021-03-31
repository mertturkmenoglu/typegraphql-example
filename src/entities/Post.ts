import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  content!: string;

  @Field()
  @ManyToOne(() => User, (user) => user.posts)
  createdBy!: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;
  
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;
}