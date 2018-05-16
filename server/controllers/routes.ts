import * as express from "express";
import expressRouter from "express-promise-router";

import * as mainController from "./main-controller";

export function initRoutes(app: express.Express): void {
    const router = expressRouter();
    app.use(router);

    router.use("*", mainController.index);
}
