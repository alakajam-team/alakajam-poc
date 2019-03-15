import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { Timestamped } from "./timestamped";
import { ColumnTypesUtils, NodeType } from "./utils/column-type-utils";

export type Permission = "read" | "write" | "manage";

/**
 * Role of an user on a node (= entry or post).
 */
@Entity()
@TableInheritance({ column: { type: "varchar", name: "node_type" } })
export class UserRole extends Timestamped {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "user_id" })
  public userId: number;

  @Column(ColumnTypesUtils.varchar({ name: "user_name" }))
  public userName: string;

  @Column(ColumnTypesUtils.varchar({ name: "user_title", nullable: true }))
  public userTitle: string;

  @Column(ColumnTypesUtils.varchar())
  public permission: Permission;

}
