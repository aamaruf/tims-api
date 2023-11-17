import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import fs from "fs";
import helmet from 'helmet';
import * as https from "http";
import mongoose from "mongoose";
import passport from "passport";
import path from "path";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import passportConfig from "./src/configs/passport.js";
import { errlogger } from "./src/middlewares/error_logger.middleware.js";
import apiRoutes from "./src/routes/index.routes.js";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(
    cors({
        origin: [],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'trusted-scripts.com'],
    },
}));

// config rate limit
const limiter = rateLimit({
    max: 2000,
    windowMs: 60 * 60 * 1000,
    message: "too many requests, please try again in an hour !",
});

app.use(limiter);

// config apicache
// let cache = apicache.middleware
// app.use(cache('5 minutes'))

passportConfig(passport);
app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

// Register routes
app.use("/api", apiRoutes);

// Swagger definition options
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TIMS API',
            version: '1.0.0',
            description: 'API documentation for TIMS API',
        },
    },
    // apis:  ['./routes/*.js'], // files containing annotations as above
    apis: ['./src/routes/*.js'], // files containing annotations as above
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);
// Serve Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Error handler
app.use(errlogger);

const key = path.join(__dirname, "./keys", "privkey.pem");
const cert = path.join(__dirname, "./keys", "cert.pem");
const ch = path.join(__dirname, "./keys", "chain.pem");

const server_options = {
    key: fs.readFileSync(key),
    cert: fs.readFileSync(cert),
    ch: fs.readFileSync(ch),
};

// const httpServer = https.createServer(server_options, app);
const httpServer = https.createServer(app);

mongoose
    .connect(process.env.DB_URL, {
        authSource: "admin",
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
    })
    .then((conn) => {
        console.log("Connected to MongoDB");
        httpServer.listen(process.env.APP_PORT, () => {
            console.log(`\n\TIMS API running on port ==> ${process.env.APP_PORT}\n`);
            console.log(`\n\TIMS API ducumentation ==> http://localhost:${process.env.APP_PORT}/docs\n`);
        });
    })
    .catch((err) => {
        console.log(err);
    });


