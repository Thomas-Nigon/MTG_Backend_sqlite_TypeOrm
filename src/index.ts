import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { dataSource } from "./config/db";
import cardRoute from "./routes/CardRoute";
import categoryRoute from "./routes/categoryRoute";
import userRoute from "./routes/userRoute";
import deckRoute from "./routes/deckRoute";

dotenv.config();

const app = express();
const port = 5050;

app.use(express.json());
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

app.use(cardRoute);
app.use(categoryRoute);
app.use(userRoute);
app.use(deckRoute);

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Server is running on port ${port}`);
});

export default app;
