/* tslint:disable:variable-name */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Timestamped } from "./timestamped";
import { ColumnTypesUtils } from "./entity-utils";

@Entity()
export class Entry extends Timestamped {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column(ColumnTypesUtils.varchar({ nullable: true }))
  public title: string;

  @Column(ColumnTypesUtils.varchar({ length: 2000, nullable: true }))
  public description: string;

}
