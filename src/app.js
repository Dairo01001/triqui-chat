const express = require("express");
const http = require("http");
const path = require("path");

const app = express();
app.set("port", process.env.PORT || 3000);
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "public")));

module.exports = { server, app };
