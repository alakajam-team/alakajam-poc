import { NextFunction, Request, Response } from "express";
import entryService from "../service/entry/entry-service";

export async function index(req: Request, res: Response) {
  let entries = await entryService.getAll();

  if (entries.length < 5) {
    await entryService.create({
      title: "Awesome game " + (entries.length + 1),
      description: "A really awesome game",
    });
    entries = await entryService.getAll();
  }

  res.render("index", {
    name: "Alakajam!",
    entries,
  });
}

export async function deleteEntries(req: Request, res: Response) {
  await entryService.deleteAll();
  res.redirect("/");
}

export async function notFound(req: Request, res: Response) {
  res.render("404");
}
