/* tslint:disable:variable-name */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ColumnTypesUtils } from "./entity-utils";
import { Timestamped } from "./timestamped";

export type EventStatus = "pending" | "open" | "closed";
export type EventStatusRules = "disabled" | "off" | number;
export type EventStatusTheme = "disabled" | "off" | "voting" | "shortlist" | "closed" | "results" | number;
export type EventStatusEntry = "off" | "open" | "open_unranked" | "closed";
export type EventStatusResults = "disabled" | "off" | "voting" | "voting_rescue" | "results" | number;
export type EventStatusTournament = "disabled" | "off" | "submission" | "playing" | "closed" | "results";

@Entity()
export class Event extends Timestamped {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column(ColumnTypesUtils.varchar())
  public name: string;

  @Column(ColumnTypesUtils.varchar())
  public title: string;

  @Column(ColumnTypesUtils.varchar())
  public display_dates: string;

  @Column(ColumnTypesUtils.varchar())
  public display_theme: string;

  @Column(ColumnTypesUtils.varchar())
  public logo: string;

  @Column(ColumnTypesUtils.varchar())
  public status: EventStatus;

  @Column(ColumnTypesUtils.varchar())
  public status_rules: EventStatusRules;

  @Column(ColumnTypesUtils.varchar())
  public status_theme: EventStatusTheme;

  @Column(ColumnTypesUtils.varchar())
  public status_entry: EventStatusEntry;

  @Column(ColumnTypesUtils.varchar())
  public status_results: EventStatusResults;

  @Column(ColumnTypesUtils.varchar())
  public status_tournament: EventStatusTournament;

  @Column(ColumnTypesUtils.varchar())
  public countdown_config: {date?: Date, phrase?: string, enabled?: boolean};

  @Column(ColumnTypesUtils.varchar())
  public divisions: {[key: string]: string};

  @Column({ default: 0 })
  public entry_count: number;

  @Column(ColumnTypesUtils.dateTime({ nullable: true }))
  public started_at: Date;

}
