/* tslint:disable:variable-name */

import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ColumnTypesUtils } from "./entity-utils";

export abstract class Timestamped {

  @CreateDateColumn(ColumnTypesUtils.dateTime({ nullable: true }))
  public created_at: Date;

  @UpdateDateColumn(ColumnTypesUtils.dateTime({ nullable: true }))
  public modified_at: Date;

}
