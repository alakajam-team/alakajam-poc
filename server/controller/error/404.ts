import { Request, Response } from "express";

export async function error404(req: Request, res: Response) {
  res.render("error/404");
}
