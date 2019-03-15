
import { ChildEntity, JoinColumn, ManyToOne } from "typeorm";
import { Entry } from "./entry";
import { UserRole } from "./userrole";

@ChildEntity()
export class UserRoleEntry extends UserRole {

  @ManyToOne(() => Entry, (entry) => entry.userRoles)
  @JoinColumn({ name: "node_id" })
  public entry: Entry;

}
