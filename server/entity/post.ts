/* tslint:disable:variable-name */

import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ColumnTypesUtils } from "./entity-utils";
import { Node } from "./node";
import { User } from "./user";

@Entity()
export class Post extends Node {

  @Column(ColumnTypesUtils.varchar())
  public name: string;

  @Column(ColumnTypesUtils.varchar())
  public title: string;

  @Column(ColumnTypesUtils.varchar({ length: 100000, nullable: true }))
  public body: string;

  @Column(ColumnTypesUtils.varchar({ nullable: true }))
  public special_post_type: string;

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
