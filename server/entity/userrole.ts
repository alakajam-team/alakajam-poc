import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { NodeType, ColumnTypesUtils } from "./entity-utils";
import { Timestamped } from "./timestamped";

export type Permission = "read" | "write" | "manage";

/**
 * Role of an user on a node (= entry or post).
 */
@Entity()
export class UserRole extends Timestamped {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public user_id: number;

  @Column(ColumnTypesUtils.varchar())
  public user_name: string;

  @Column(ColumnTypesUtils.varchar({ nullable: true }))
  public user_title: string;

  @Column()
  public node_id: number;

  @Column(ColumnTypesUtils.varchar())
  public node_type: NodeType;

  @Column(ColumnTypesUtils.varchar())
  public permission: Permission;

}
