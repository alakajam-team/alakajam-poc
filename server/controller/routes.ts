import * as express from "express";
import expressRouter from "express-promise-router";
import * as path from "path";
import constants from "../constants";
import { error404 } from "./error/404";
import { homeGet, homePost } from "./home/home";

export function configure(app: express.Express): void {
    const router = expressRouter();
    app.use(router);

    router.use("/static", express.static(path.join(constants.PATH_SOURCES_ROOT, "dist/client")));
    router.use("/static", express.static(path.join(constants.PATH_SOURCES_ROOT, "static")));

    router.get("/$", homeGet);
    router.post("/$", homePost);

    router.use(error404);
}
