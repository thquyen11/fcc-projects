"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
class App {
    constructor() {
        this.app = express();
        this.config();
    }
    config() {
        this.app.use(bodyParser.json);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map