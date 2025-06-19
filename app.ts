import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { router } from "./router/route.ts";
import { verifyToken } from "./middleware/verifyToken.ts";
import { dbConnet } from "./controllers/dbConnect.ts";
import { User } from "./model/userSchema.ts";
import { isAdmin } from "./middleware/isAdmin.ts";
const app = express();

dotenv.config();
dbConnet();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", router);

app.get("/", verifyToken, (req, res) => {
  res.status(200).json({
    success: "Protected route access granted",
    msg: `Current Loggedin user user is: `,
    user: req.user,
  });
});

app.get("/about", async (req, res) => {
  const allUsers = await User.find();
  res.status(200).json({ msg: `All users: `, allUsers });
});

app.get("/admin/dashboard", isAdmin, async (req, res) => {
  res.status(200).json({ msg: `Hello admin ` });
});

app.listen(8000, () => {
  console.log("Server running at port 8000");
});
