import fs from "fs";
import { ExtractJwt, Strategy } from "passport-jwt";
import path from "path";
import { fileURLToPath } from "url";
import { UserModel } from "../schemas/user.schema.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const pathToKey = path.join(__dirname, "../utils/keys", "public.key");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"],
};
export default (passport) => {
    passport.use(
        new Strategy(options, async function (jwt_payload, done) {
            const user = await UserModel.findById(jwt_payload._id).select('-password -token');
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        })
    );
    passport.serializeUser(function (user, done) {
        process.nextTick(function () {
            done(null, user);
        });
    });

    passport.deserializeUser(function (user, done) {
        process.nextTick(function () {
            return done(null, user);
        });
    });
};



