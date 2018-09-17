/* tslint:disable:variable-name */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Entry {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public description: string;

}
