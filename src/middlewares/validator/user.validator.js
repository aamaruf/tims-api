// ...rest of the initial code omitted for simplicity.
import * as pkg from 'express-validator';
const { check } = pkg;

export const registerValidator = [
    check('name')
        .notEmpty()
        .matches(/^[a-zA-Z ]*$/)
        .withMessage('Name cannot contain special characters')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name is too short or too long'),

    check('email', "Invalid email")
        .notEmpty()
        .isEmail(),

    check('password')
        .notEmpty(),

    check('phone', 'Phone number is requred')
        .notEmpty(),
    // .isMobilePhone("bn-BD").isLength({ min: 11, max: 11 })
    // .withMessage('Invalid phone number'),
];

export const loginValidator = [
    check('phone')
        .notEmpty(),
    // .isMobilePhone("bn-BD").isLength({ min: 11 })
    // .withMessage('Invalid phone number'),

    check('password', "Password is required")
        .notEmpty()
];

export const paramsIdValidator = [
    check('id', "Invalid id")
        .notEmpty()
];

export const userVerifyValidator = [
    check('phone')
        .notEmpty(),
    // .isMobilePhone("bn-BD").isLength({ min: 11 })
    // .withMessage('Invalid phone number'),

    check('otp')
        .notEmpty()
        .isLength({ min: 6, max: 6 }),
]

export const userResendVerificationCodeValidator = [
    check('phone')
        .notEmpty(),
    // .isMobilePhone("bn-BD").isLength({ min: 11 })
    // .withMessage('Invalid phone number'),
]