import { Column, Entity, OneToMany, JoinColumn } from "typeorm";
import { ColumnTypesUtils } from "./entity-utils";
import { Node } from "./node";
import { UserRole } from "./userrole";

@Entity()
export class Entry extends Node {

  @Column(ColumnTypesUtils.varchar({ nullable: true }))
  public title: string;

  @Column(ColumnTypesUtils.varchar({ length: 2000, nullable: true }))
  public description: string;
/*
  @OneToMany(type => UserRole, userRole => userRole.entry)
  @JoinColumn({
  //  referencedColumnName: "node_id",

  })
  public userRoles: UserRole[];
*/
}
