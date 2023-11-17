import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    next();
};
