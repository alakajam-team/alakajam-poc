/* tslint:disable:variable-name */

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ColumnTypesUtils } from "./entity-utils";
import { Post } from "./post";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @Column({ nullable: true })
  public title: string;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  public avatar: string;

  @Column({ default: false })
  public is_mod: boolean;

  @Column({ default: false })
  public is_admin: boolean;

  @Column({ default: false })
  public disallow_anonymous: boolean;

  @Column()
  public password: string;

  @Column()
  public password_salt: string;

  @Column({ nullable: true })
  public notifications_last_read: Date;

  @Column(ColumnTypesUtils.dateTime())
  public created_at: Date;

  @Column(ColumnTypesUtils.dateTime())
  public modified_at: Date;

  @OneToMany((type) => Post, (post) => post.user)
  public posts: Post[];

}
