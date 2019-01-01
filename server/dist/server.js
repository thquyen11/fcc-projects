"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
require('dotenv').config();
app_1.default.listen(process.env.PORT, () => {
    console.log("Server running on port ", process.env.PORT);
});
app_1.default.get("/", (req, res) => {
    console.log(req);
    res.status(200).json("GET request OK");
});
app_1.default.get("/api/timestamp/:date_string", (req, res) => {
    const { date_string } = req.params;
    if (date_string) {
        const date = new Date(date_string);
        const error = {
            "error": "Invalid Date",
        };
        if (date) {
            const payload = {
                "unix": date.getTime(),
                "utc": date.toUTCString(),
            };
            res.status(200).json(payload);
        }
        else {
            res.status(200).json(error);
        }
    }
    else {
        const date = new Date();
        const payload = {
            "unix": date.getTime(),
            "utc": date.toUTCString(),
        };
        res.status(200).json(payload);
    }
});
//# sourceMappingURL=server.js.map