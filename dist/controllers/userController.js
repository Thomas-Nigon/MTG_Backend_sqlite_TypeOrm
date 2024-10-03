"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.createUser = void 0;
const user_1 = require("../entities/user");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const NewUser = new user_1.User();
        NewUser.username = user.username;
        NewUser.email = user.email;
        NewUser.password = user.password;
        yield NewUser.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).send("Error creating user");
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rows = yield user_1.User.find();
        if (rows.length !== 0) {
            res.json(rows);
        }
        else {
            res.status(404).json({ message: "No users found" });
        }
    }
    catch (error) {
        res.status(500).send("Error getting users:");
    }
});
exports.getUsers = getUsers;
