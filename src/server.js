import express from "express";
import Env from "./config/env.js";
import AuthRouter from "./route/auth.route.js";
import FoodRouter from "./route/food.route.js";
import connectDB from "./config/connectToDB.js";
import cookieparser from "cookie-parser";
import cors from "cors";
import OrderRouter from "./route/order.route.js";
const app = express();
app.use(express.json());
app.use(cookieparser());
const allowedOrigins = [
  'http://localhost:5173',
  'https://restro-frontend-8997.onrender.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use("/auth", AuthRouter);
app.use("/food", FoodRouter);
app.use("/order", OrderRouter);

app.get("/", (req, res) => {
  res.json({
    message: "server started Successfuly",
  });
});

async function startServer() {
  await connectDB();

  app.listen(Env.PORT, () => {
    console.log(`Server started at URL http://localhost:${Env.PORT} `);
  });
}

startServer();
