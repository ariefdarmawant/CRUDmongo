import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import dbURL from './configs/db.js';

dotenv.config();
const app = express();

console.log("INI URLL DBBBBBB" ,dbURL.url)

mongoose.connect(dbURL.url, {
  authSource: "admin",
  user: "admin",
  pass: "password",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//config db and express with cors (*) any ORIGIN can hit this API
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database Connected"));

//use middleware
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

//Activate auth routes
authRoutes(app);
//Activate user routes
userRoutes(app);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen("3000", () => console.log("Server Running at port: 3000"));
