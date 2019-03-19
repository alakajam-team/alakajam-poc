// tslint:disable:no-unused-expression

import { expect } from "chai";
import { UserRoleEntry } from "server/entity/userroleentry";
import { EntryRepository } from "server/service/entry/entry-repository";
import "server/test/service-spec";
import * as sinon from "sinon";
import { Repository } from "typeorm";
import { EntryService } from "./entry-service";

describe("Entry service", async () => {

  let entryRepository: sinon.SinonStubbedInstance<EntryRepository>;
  let userRoleRepository: sinon.SinonStubbedInstance<Repository<UserRoleEntry>>;
  let entryService: EntryService;

  beforeEach(() => {
    entryRepository = sinon.createStubInstance(EntryRepository);
    userRoleRepository = sinon.createStubInstance(Repository);
    entryService = new EntryService(entryRepository as any, userRoleRepository as any);
  });

  it("should generate if there are no entries", async () => {
    entryRepository.count.returns(Promise.resolve(0));
    await entryService.generateEntry();
    expect(entryRepository.create.called).to.be.true;
  });

  it("should not generate if there are already 5 entries", async () => {
    entryRepository.count.returns(Promise.resolve(5));
    await entryService.generateEntry();
    expect(entryRepository.create.called).to.be.false;
  });

});
