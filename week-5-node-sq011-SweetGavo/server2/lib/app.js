"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const html_metadata_parser_1 = require("html-metadata-parser");
const server = http_1.default.createServer(async (req, res) => {
    var _a;
    if (req.method === "GET") {
        const url = `https://${(_a = req.url) === null || _a === void 0 ? void 0 : _a.split("/")[1]}`;
        const message = {
            images: [],
            description: "none",
            title: null
        };
        if (!req.url || !req.url.startsWith("/")) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Missing or invalid URL" }));
            return;
        }
        let err;
        try {
            let result = await html_metadata_parser_1.parser(url);
            const { image, description, title } = result.meta;
            const { images } = result;
            message.title = title;
            message.description = description;
            message.images.push(images);
            const keys = Object.keys(message);
            for (let i = 0; i <= 2; i++) {
                message[`${keys[i]}`] = message[`${keys[i]}`] == undefined ? "none" : message[`${keys[i]}`];
            }
            err = false;
        }
        catch (error) {
            err = true;
        }
        finally {
            if (err) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Invalid request" }));
                return 0;
            }
            else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message }));
                return 1;
            }
        }
    }
});
server.listen(3002, () => {
    console.log(`Server is presently running on port. Go to http://localhost:3002`);
});
