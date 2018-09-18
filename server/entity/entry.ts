/* tslint:disable:variable-name */

import { Column, Entity } from "typeorm";
import { ColumnTypesUtils } from "./entity-utils";
import { Node } from "./node";

@Entity()
export class Entry extends Node {

  @Column(ColumnTypesUtils.varchar({ nullable: true }))
  public title: string;

  @Column(ColumnTypesUtils.varchar({ length: 2000, nullable: true }))
  public description: string;

}
