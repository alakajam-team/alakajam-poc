/* tslint:disable:variable-name */

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Timestamped } from "./timestamped";
import { ColumnTypesUtils } from "./entity-utils";

/**
 * Site-wide setting.
 * Settings are stored as a simple table of string keys and values.
 */
@Entity()
export class Setting extends Timestamped {

  @PrimaryGeneratedColumn()
  public key: string;

  @Column(ColumnTypesUtils.varchar({ length: 10000 }))
  public value: string;

}

