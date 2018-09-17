import * as path from "path";
import * as express from "express";
import expressRouter from "express-promise-router";
import * as mainController from "./main-controller";
import constants from "../constants";

export function initRoutes(app: express.Express): void {
    const router = expressRouter();
    app.use(router);

    router.use("/static", express.static(path.join(constants.PATH_SOURCES_ROOT, "dist/client")));
    router.use("/static", express.static(path.join(constants.PATH_SOURCES_ROOT, "static")));

    router.use("/$", mainController.index);

    router.use(mainController.notFound);
}
