import { Router } from "express";
import passport from "passport";

import ItineraryRoutes from "./itineraries.routes.js";
import UserRoutes from "./user.routes.js";


const router = Router();

router.use("/users", UserRoutes);
router.use("/itineraries", passport.authenticate("jwt", { session: false }), ItineraryRoutes);

export default router;