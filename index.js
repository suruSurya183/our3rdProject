import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import Connection from "./database/db.js";
import categoryRouter from "./routes/category.route.js";
import faqRouter from "./routes/faq.route.js";
import userRouter from "./routes/user.route.js";

/********************************************/
const app = express();
dotenv.config();
const PORT = 8000 || process.env.PORT;

/*****************MIDDLEWARES*****************/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url); // Get directory name using import.meta.url
const __dirname = path.dirname(__filename); // Get directory name using import.meta.url
app.use("/", express.static(__dirname + "/public"));

/*******************ROUTES******************/
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/faq", faqRouter);

/*******************ROUTES******************/

const MONGODB_URL = process.env.MONGODB_URL;

Connection(MONGODB_URL);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error while listening on PORT: ${PORT}`);
  } else {
    console.log(`Server is listening on PORT: ${PORT}`);
  }
});

/***************************************/
