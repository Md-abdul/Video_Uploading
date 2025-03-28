const express = require("express");
const cors = require("cors");
const connectDB = require("./database");
const dotenv = require("dotenv");
const path = require("path");
const { UserRoutes } = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

connectDB();

const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads/videos");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Welcome to backend ..!!!!");
});

app.use("/api/user", UserRoutes);
app.use("/api/videos", videoRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.message === "Only video files are allowed!") {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
