// ...rest of the initial code omitted for simplicity.
import * as pkg from 'express-validator';
const { check } = pkg;

export const createItinerariesValidator = [
    check('title', "Title is required")
        .notEmpty(),

    check('destinations')
        .notEmpty()
        .isArray({ min: 1 })
        .withMessage('At least one destination is required'),

    check('activities')
        .notEmpty()
        .isArray({ min: 1 })
        .withMessage('Add at least one activity'),

    check('startDate', "Travel start date is required")
        .notEmpty()
        .isDate(),

    check('endDate', "Travel end date is required")
        .notEmpty()
        .isDate(),

    check('transportations', 'Transportation details is requred')
        .notEmpty(),

    check('accommodations', 'Accommodation details is requred')
        .notEmpty(),

    check('members', 'Number of members is required')
        .notEmpty()
        .isNumeric(),
];