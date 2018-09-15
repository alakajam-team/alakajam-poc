import { DeepPartial, getRepository, Repository } from "typeorm";
import { Entry } from "../entity/entry";

export class EntryService {
  private repository: Repository<Entry>;

  constructor() {
    this.repository = getRepository(Entry);
  }

  public async getAll(): Promise<Entry[]> {
    return this.repository.find();
  }

  public async create(properties: DeepPartial<Entry>) {
    const entry = this.repository.create(properties);
    await this.repository.save(entry);
  }

}

export default new EntryService();
