export interface Environment {
  readonly devMode: boolean;
  readonly launchTime: number;
}

export class EnvironmentImpl {
  public devMode: boolean;
  public launchTime: number;
}

export default new EnvironmentImpl() as Environment;
