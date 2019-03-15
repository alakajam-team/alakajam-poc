import constants from "server/constants";
import enums from "server/core/enums";
import environment from "server/environment";

export default {
  browserRefreshUrl: process.env.BROWSER_REFRESH_URL,
  constants,
  enums,
  devMode: environment.devMode,
  launchTime: environment.launchTime,
};
