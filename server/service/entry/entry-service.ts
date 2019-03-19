import { UserRoleEntry } from "server/entity/userroleentry";
import { EntryRepository } from "server/service/entry/entry-repository";
import { getCustomRepository, getRepository } from "typeorm";

export class EntryService {

  constructor(
    private entryRepository = getCustomRepository(EntryRepository),
    private userRoleEntryRepository = getRepository(UserRoleEntry),
  ) {}

  public async generateEntry(): Promise<void> {
    const entryCount = await this.entryRepository.count();
    if (entryCount < 5) {
      const entry = this.entryRepository.create({
        title: "Awesome game " + (entryCount + 1),
        description: "A really awesome game",
      });
  /*    entry.userRoles = [
        this.userRoleEntryRepository.create({
          userTitle: "bob",
        }),
      ];*/
      await this.entryRepository.save(entry);
    }
  }

}

export default new EntryService();
