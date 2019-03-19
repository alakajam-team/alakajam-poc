import { UserRoleEntry } from "server/entity/userroleentry";
import { EntryRepository } from "server/service/entry/entry-repository";
import { getCustomRepository, getRepository } from "typeorm";

const entryRepository = getCustomRepository(EntryRepository);
const userRoleEntryRepository = getRepository(UserRoleEntry);

export class EntryService {

  public async generateEntry(): Promise<void> {
    const entryCount = await entryRepository.count();
    if (entryCount < 5) {
      const entry = entryRepository.create({
        title: "Awesome game " + (entryCount + 1),
        description: "A really awesome game",
      });
  /*    entry.userRoles = [
        this.userRoleEntryRepository.create({
          userTitle: "bob",
        }),
      ];*/
      await entryRepository.save(entry);
    }
  }

}

export default new EntryService(
  getCustomRepository(EntryRepository),
  getRepository(UserRoleEntry));
