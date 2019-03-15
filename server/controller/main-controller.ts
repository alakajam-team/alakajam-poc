import { Request, Response } from "express";
import entryService from "../service/entry/entry-service";
import { getCustomRepository } from "typeorm";
import { EntryRepository } from "server/repository/entry-repository";

const entryRepository = getCustomRepository(EntryRepository);

export async function index(req: Request, res: Response) {
  await entryService.generateEntry();
  const entries = await entryRepository.find();

  res.render("index", {
    name: "Alakajam!",
    entries,
  });
}

export async function deleteEntries(req: Request, res: Response) {
  await entryRepository.deleteAll();

  res.redirect("/");
}

export async function notFound(req: Request, res: Response) {
  res.render("404");
}
