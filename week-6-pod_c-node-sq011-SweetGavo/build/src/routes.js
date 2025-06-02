"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_Controller_1 = require("./controller/user.Controller");
function routes(app) {
  app.get("/healthcheck", (req, res) => res.sendStatus(200));
  app.post("/api/users", user_Controller_1.createUserHandler);
}
exports.default = routes;
