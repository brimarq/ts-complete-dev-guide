import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { AppRouter } from "./AppRouter";
import "./controllers/LoginController";
import "./controllers/RootController";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["laskkdjf"] }));
app.use(AppRouter.getInstance()); // singleton instance

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
