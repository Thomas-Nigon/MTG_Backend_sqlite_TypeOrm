"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const hashPassword_1 = __importDefault(require("../middleware/hashPassword"));
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.get("/users", userController_1.getUsers);
router.post("/users/auth", authController_1.auth);
router.post("/users/create", hashPassword_1.default, userController_1.createUser);
exports.default = router;
