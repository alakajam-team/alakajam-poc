/* tslint:disable:variable-name */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Timestamped } from "./timestamped";
import { ColumnTypesUtils } from "./utils/column-type-utils";

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
