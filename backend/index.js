import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(urlencoded({ extended: true }));

//create server and routes

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
