import express, { Application } from "express";
import cors from "cors";
import { connect } from "mongoose";
const URL: string = "mongodb://127.0.0.1:27017/paynowDB";
import user from "./router/userRouter";
const app: Application = express();

const port: number = 1100;

app.use(express.json());
app.use(cors());
app.use("/", user);

app.listen(port, () => {
  console.log("server ready");

  connect(URL)
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.error();
    });
});
