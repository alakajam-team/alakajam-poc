/* tslint:disable:variable-name */

import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { ColumnTypesUtils } from "./entity-utils";
import { User } from "./user";

/**
 * Extended user information, mostly containing the user profile page.
 */
@Entity()
export class UserDetails {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public user_id: number;

  @OneToOne((type) => User, (user) => user.details, { nullable: false })
  @JoinColumn({ name: "user_id" })
  public user: User;

  @Column(ColumnTypesUtils.varchar({ length: 100000 }))
  public body: string;

  @Column(ColumnTypesUtils.varchar({ length: 1000 }))
  public social_links: {[key: string]: string};

}
