import { Request, Response } from "express";
import { EntryRepository } from "server/service/entry/entry-repository";
import entryService from "server/service/entry/entry-service";
import { getCustomRepository } from "typeorm";

const entryRepository = getCustomRepository(EntryRepository);

export async function homeGet(req: Request, res: Response) {
  await entryService.generateEntry();
  const entries = await entryRepository.find();

  res.render("home/home", {
    name: "Alakajam!",
    entries,
  });
}

export async function homePost(req: Request, res: Response) {
  await entryRepository.deleteAll();

  res.redirect("/");
}
