import { config } from "dotenv";
config();

const PORT = 8080;

import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

/* Create App */
import express, { urlencoded } from "express";
const app = express();
app.use(urlencoded({ extended: true }));

/* Attach Api */
import api from "./api/router.js";
app.use("/api", api);

/* Attach Frontend */
app.use(express.static(path.resolve(__dirname, "../client/dist/")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

/* Listen */
app.listen(PORT, () => {
    console.log("App is running on port: " + PORT);
});
