
import { ChildEntity, JoinColumn, ManyToOne } from "typeorm";
import { Post } from "./post";
import { UserRole } from "./userrole";

@ChildEntity()
export class UserRolePost extends UserRole {

  @ManyToOne(() => Post, (post) => post.userRoles)
  @JoinColumn({ name: "node_id" })
  public post: Post;

}
