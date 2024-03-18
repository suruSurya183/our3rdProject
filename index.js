import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import Connection from "./database/db.js";
import categoryRouter from "./routes/category.route.js";
import vendorRouter from "./routes/vendor.route.js";
import trackingRouter from "./routes/tracking.route.js";
import faqRouter from "./routes/faq.route.js";
import userRouter from "./routes/user.route.js";
import reviewRouter from "./routes/review.route.js";
import wishlistRouter from "./routes/wishlist.route.js";
import contactRouter from "./routes/contact.route.js";
import notificationRouter from "./routes/notification.route.js";
import feedbackRouter from "./routes/feedback.route.js";
import refundRouter from "./routes/refund.route.js";
import paymentRouter from "./routes/payment.route.js";


/********************************************/
const app = express();
dotenv.config();
const PORT = 8000 || process.env.PORT;

/*****************MIDDLEWARES*****************/

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url); // Get directory name using import.meta.url
const __dirname = path.dirname(__filename); // Get directory name using import.meta.url
app.use("/", express.static(__dirname + "/public"));

/*******************ROUTES******************/
app.use("/category", categoryRouter);
app.use("/vendor", vendorRouter);
app.use("/tracking", trackingRouter);
app.use("/faq", faqRouter);
app.use("/user", userRouter);
app.use("/review", reviewRouter);
app.use("/wishlist",wishlistRouter );
app.use("/contact", contactRouter);
app.use("/notification", notificationRouter)
app.use("/feeedback",feedbackRouter)
app.use("/refund", refundRouter)
app.use("/payment", paymentRouter)


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
