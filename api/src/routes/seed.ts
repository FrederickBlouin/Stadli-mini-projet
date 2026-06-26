import { Hono } from "hono";
import * as seedController from "../controllers/seedController";

const seedRoutes = new Hono();

seedRoutes.delete("/reset", seedController.resetTables);

export default seedRoutes;