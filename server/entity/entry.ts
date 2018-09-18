/* tslint:disable:variable-name */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Timestamped } from "./timestamped";

@Entity()
export class Entry extends Timestamped {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public description: string;

}
