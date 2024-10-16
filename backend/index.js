const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/index.js"); // Router for handling routes

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000; // Fix the fallback logic

// const allowedOrigins =
//   process.env.NODE_ENV === "development"
//     ? ["http://localhost:5173"]
//     : ["https://your-production-url.com"];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true, // Allow sending cookies if needed
//   })
// );

app.use(cors());

app.use(express.json()); // to support JSON-encoded bodies

app.use("/api/v1", apiRouter); // Use the apiRouter for v1 endpoints

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
