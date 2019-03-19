import { Entry } from "server/entity/entry";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Entry)
export class EntryRepository extends Repository<Entry> {

  public async getAll(): Promise<Entry[]> {
    return this.find({ relations: [ "userRoles" ]});
  }

  public async deleteAll(): Promise<void> {
    await this.delete({});
  }

}
