"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var port = 4001;
var database = [];
app.post("/messages", function (req, res) {
    var body = req.body;
    if (!body) {
        return res.status(400).json({ message: "bad request" });
    }
    database.push(body);
    return res.status(200).json({ message: "success" });
});
app.delete("/messages/:id", function (req, res) {
    var _a;
    var id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "bad request" });
    }
    for (var i = 0; i < database.length; i++) {
        if (database[i] && ((_a = database[i]) === null || _a === void 0 ? void 0 : _a.id) === id) {
            database.splice(i, 1);
            break;
        }
    }
    return res.status(200).json({ message: "success" });
});
app.patch("/messages/:id", function (req, res) {
    var body = req.body;
    var id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "bad request" });
    }
    if (!body) {
        return res.status(400).json({ message: "bad request" });
    }
    for (var _i = 0, database_1 = database; _i < database_1.length; _i++) {
        var obj = database_1[_i];
        if (obj.id === id) {
            obj.id = body.id || obj.id;
            obj.text = body.text || obj.text;
        }
    }
    return res.status(200).json({ message: "success" });
});
app.get("/messages/:id", function (req, res) {
    var body = req.body;
    var id = req.params.id;
    if (!body) {
        return res.status(400).json({ message: "bad request" });
    }
    if (!id) {
        return res.status(400).json({ message: "bad request" });
    }
    var obj = database.find(function (m) { return m.id === id; });
    return res.status(200).json({ message: "success", data: obj });
});
app.get("/messages", function (req, res) {
    var page = Number(req.query.page) || 1;
    var limit = Number(req.query.limit) || 10;
    if (page < 1)
        page = 1;
    if (limit < 1)
        limit = 10;
    var start = (page - 1) * limit;
    var end = start + limit;
    var items = database.slice(start, end);
    return res.status(200).json({ page: page, limit: limit, data: items });
});
