import { DeepPartial, getRepository, getConnection, Repository, EntityManager, Transaction, TransactionManager } from "typeorm";
import { Entry } from "../entity/entry";

export class EntryService {
  private repository: Repository<Entry>;

  constructor() {
    this.repository = getRepository(Entry);
  }

  public async getAll(): Promise<Entry[]> {
    return this.repository.find();
  }

  @Transaction()
  public create(properties: DeepPartial<Entry>, @TransactionManager() manager?: EntityManager): Promise<Entry> {
    const entryRepository = manager.getRepository(Entry);
    const entry = entryRepository.create(properties);
    return entryRepository.save(entry);
  }

}

export default new EntryService();
