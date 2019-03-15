import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { Node } from "./node";
import { UserRoleEntry } from "./userroleentry";
import { ColumnTypesUtils } from "./utils/column-type-utils";

@Entity()
export class Entry extends Node {

  @Column(ColumnTypesUtils.varchar({ nullable: true }))
  public title: string;

  @Column(ColumnTypesUtils.varchar({ length: 2000, nullable: true }))
  public description?: string;

  @OneToMany(() => UserRoleEntry, (userRole) => userRole.entry, { cascade: true })
  @JoinColumn({ referencedColumnName: "node_id" })
  public userRoles: UserRoleEntry[];

}
