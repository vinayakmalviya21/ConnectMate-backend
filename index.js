const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.route");
const friendRoutes = require("./routes/friend.route");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", userRoutes);
app.use("/api", friendRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
