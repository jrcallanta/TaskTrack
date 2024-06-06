// Load environment variables from .env file
import { config } from "dotenv";
config();

// Import necessary modules
import portfinder from "portfinder";
import express, { urlencoded } from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import apiRouter from "./api/router.js";

// Set up the directory path
const __dirname = dirname(fileURLToPath(import.meta.url));

// Create and configure the Express app
const app = express();
app.use(urlencoded({ extended: true }));

// Attach API and frontend routes
app.use("/api", apiRouter);
app.use(express.static(path.resolve(__dirname, "../client/dist/")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

// Find an available port and start the server
portfinder.getPort((err, port) => {
    if (err) {
        // If an error occurs, log it and exit the process
        console.log(err);
        process.exit(1);
    }

    // Start the server on the available port
    app.listen(port, () => {
        console.log("App is running on port: " + port);
        console.log(`TaskTimer: http://localhost:${port}`);
    });
});
