/* tslint:disable:variable-name */

import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Node } from "./node";
import { User } from "./user";
import { UserRolePost } from "./userrolepost";
import { ColumnTypesUtils } from "./utils/column-type-utils";

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

  @OneToMany(() => UserRolePost, (userRole) => userRole.post, { cascade: true })
  @JoinColumn({ referencedColumnName: "node_id" })
  public userRoles: UserRolePost[];

}
