import * as moment from "moment";

export default {
  keys: (obj) => Object.keys(obj),
  values: (obj) => Object.values(obj),
  pretty: (obj) => JSON.stringify(obj, null, 2),
  relativeTime: (date) => moment(date).utc().fromNow(),
};
