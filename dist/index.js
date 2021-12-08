"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const app = new server_1.Server().app;
//require('dotenv').config()
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is started on port ${port}`);
});
