import { ColumnOptions } from "typeorm";
import config from "../config";

const types = {
  dateTime: "date",
};
if (config.type === "postgres") {
  types.dateTime = "timestamp with time zone";
}

export class ColumnTypesUtils {

  public static dateTime(additionalOptions: ColumnOptions = {}): ColumnOptions {
    return Object.assign({ type: types.dateTime }, additionalOptions);
  }

  public static varchar(additionalOptions: ColumnOptions = {}): ColumnOptions {
    return Object.assign({ type: "varchar", length: 255 }, additionalOptions);
  }

}

export type NodeType = "entry" | "post";
