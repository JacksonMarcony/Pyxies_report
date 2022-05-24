import "reflect-metadata";
import express from 'express';
import "./infra/database";
import { routes } from "./routes";

const app = express();
const PORT = 3000

app.use(express.json());

app.use(routes);

app.listen(`${PORT}`, () =>  console.log(`😋😋 Server is running in http://localhost:${PORT} 😋😋`));
