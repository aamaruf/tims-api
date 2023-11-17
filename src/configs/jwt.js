import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToKey = path.join(__dirname, "../utils/keys", "private.key");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

export const issueJWT = (payload) => {
    return jwt.sign(payload, PRIV_KEY, { expiresIn: "1h", algorithm: "RS256" });

};