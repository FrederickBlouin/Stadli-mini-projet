import { Hono } from 'hono'

const app = new Hono()

// Importe les routes
import authRoutes from "./routes/auth";

// Utilisation des routes en tant que middleware
app.route("/auth", authRoutes);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
