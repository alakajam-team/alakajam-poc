export interface Environment {
  readonly name: "development"|"production";
  readonly launchTime: number;
  readonly devMode: boolean;
}

export class EnvironmentImpl {
  public name: "development"|"production";
  public launchTime: number;

  public get devMode(): boolean {
    return this.name === "development";
  }
}

export default new EnvironmentImpl() as Environment;
