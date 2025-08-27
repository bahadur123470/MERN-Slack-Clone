import "../instrument.mjs";
import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js"
import * as Sentry from "@sentry/node"

const app = express()

app.use(express.json())
app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(clerkMiddleware())

app.get("/customSentryError", (req, res) => {
    throw new Error("This is a custom error for testing Sentry integration");
})
app.get("/", (req,res) => {
    res.send("Hello world!")
})

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
    try {
        await connectDB()
        if (ENV.NODE_ENV !== "production"){
            app.listen(ENV.PORT, () => {
                console.log(`Server is listening on port => http://localhost:${ENV.PORT}/ `)
            })
        }
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1)
    }
}

startServer()

export default app