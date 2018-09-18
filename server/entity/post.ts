/* tslint:disable:variable-name */

import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ColumnTypesUtils } from "./entity-utils";
import { Entry } from "./entry";
import { User } from "./user";
import { Timestamped } from "./timestamped";

@Entity()
export class Post extends Timestamped {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column(ColumnTypesUtils.varchar())
  public name: string;

  @Column(ColumnTypesUtils.varchar())
  public title: string;

  @Column(ColumnTypesUtils.varchar({ length: 100000, nullable: true }))
  public body: string;

  @Column(ColumnTypesUtils.varchar({ nullable: true }))
  public special_post_type: string;

  @Column({ nullable: true }) // TODO Not null default 0
  public comment_count: number;

  @Column(ColumnTypesUtils.dateTime({ nullable: true }))
  @Index()
  public published_at: Date;

  @Column({ default: 0 })
  public like_count: number;

  @Column({ type: "varchar", length: 500, default: "[]" }) // TODO Migrate to simple-json
  public like_details: { [name: string]: number };

  @ManyToOne((type) => User, (user) => user.posts, { nullable: false })
  @JoinColumn({ name: "author_user_id" })
  public user: User;

  // TODO Relations: entry, event
  /*@ManyToOne(type => Entry, entry => entry.posts)
  @JoinColumn({ name: "entry_id" })
  public entry: User;*/

}
