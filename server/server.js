import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
  res.send("Ai resume analyzer app running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});