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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const db_1 = require("./config/db");
const CardRoute_1 = __importDefault(require("./routes/CardRoute"));
const categoryRoute_1 = __importDefault(require("./routes/categoryRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const deckRoute_1 = __importDefault(require("./routes/deckRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5050;
app.use(express_1.default.json());
const cors = require("cors");
const corsOptions = {
    origin: ["*", process.env.FRONTEND_URL, "http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Accept",
        "Origin",
        "X-Requested-With",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Credentials",
    ],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(CardRoute_1.default);
app.use(categoryRoute_1.default);
app.use(userRoute_1.default);
app.use(deckRoute_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.dataSource.initialize();
    console.log(`Server is running on port ${port}`);
}));
exports.default = app;
