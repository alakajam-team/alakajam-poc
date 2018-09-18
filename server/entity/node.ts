/* tslint:disable:variable-name */

import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Timestamped } from "./timestamped";

/**
 * Nodes are abstract entities that can:
 * - Receive user roles
 * - Receive comments
 * The current two implementations are Entry and Post.
 */
export abstract class Node extends Timestamped {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true }) // TODO Not null default 0
  public comment_count: number;

}
