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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const argon2_1 = __importDefault(require("argon2"));
const user_1 = require("../entities/user");
const jose_1 = require("jose");
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("reqbodyuser:", req.body);
    console.log(email, password);
    const secret = process.env.APP_SECRET;
    if (!secret) {
        return res.status(500).json({
            message: "No secret found",
        });
    }
    console.log("auth");
    try {
        const user = yield user_1.User.findOneBy({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const decode = yield argon2_1.default.verify(user.password, password);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid password",
            });
        }
        const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET);
        const accessToken = yield new jose_1.SignJWT({
            userId: user.id,
            email: user.email,
            userName: user.username,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("10m")
            .sign(jwtSecretKey);
        res.cookie("jwt", accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
            secure: true,
            sameSite: "lax",
        });
        return res.status(200).json({
            message: "User authenticated",
            id: user.id,
            email: user.email,
            username: user.username,
            accessToken,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
    console.log("user found, get user info and generate token");
});
exports.auth = auth;
