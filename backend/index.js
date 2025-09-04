import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

dotenv.config();

import UserRoutes from "./routes/UserRoutes.js";
import BookRoutes from "./routes/BookRoutes.js";
import ReviewRoutes from "./routes/ReviewRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);


app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// Dùng thư mục /uploads như static file
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


sequelize
  .authenticate()
  .then(() => console.log("✅ MySQL Connected"))
  .catch((err) => console.error("❌ Connection error:", err));

app.get("/", (req, res) => {
  res.send("Server running with MySQL!");
});

app.use("/api/users", UserRoutes);
app.use("/api/books", BookRoutes);
app.use("/api/review", ReviewRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT}`);
});
