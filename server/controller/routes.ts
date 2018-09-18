import * as express from "express";
import expressRouter from "express-promise-router";
import * as path from "path";
import constants from "../constants";
import * as mainController from "./main-controller";

export function initRoutes(app: express.Express): void {
    const router = expressRouter();
    app.use(router);

    router.use("/static", express.static(path.join(constants.PATH_SOURCES_ROOT, "dist/client")));
    router.use("/static", express.static(path.join(constants.PATH_SOURCES_ROOT, "static")));

    router.get("/$", mainController.index);
    router.post("/$", mainController.deleteEntries);

    router.use(mainController.notFound);
}
