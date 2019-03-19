import * as sinon from "sinon";
import * as typeorm from "typeorm";

/**
 * Import this module in your spec (before the service import!), so you can test services that use TypeORM.
 * Service intiialization would otherwise fail due to the lack of a DB connection.
 * Repositories must be properly stubbed for the tests to work properly.
 */

const stubbedRepo = sinon.createStubInstance(typeorm.Repository);
sinon.stub(typeorm, "getRepository").returns(stubbedRepo as any);
sinon.stub(typeorm, "getCustomRepository").returns(stubbedRepo as any);
