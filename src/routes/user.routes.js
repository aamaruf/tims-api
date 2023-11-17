import { Router } from "express";
import passport from "passport";
import { UserController } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validator/index.js";
import { loginValidator, paramsIdValidator, registerValidator, userResendVerificationCodeValidator, userVerifyValidator } from "../middlewares/validator/user.validator.js";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API operations related to user
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegistration:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password
 *         phone:
 *           type: string
 *           description: User's phone number
 *         address:
 *           type: string
 *           description: User's address
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserVerification:
 *       type: object
 *       properties:
 *         otp:
 *           type: string
 *           description: One-time password for user verification
 *         phone:
 *           type: string
 *           description: User's phone number
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserResendVerificationCode:
 *       type: object
 *       properties:
 *         phone:
 *           type: string
 *           description: User's phone number
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserForceVerify:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: User's Id
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       properties:
 *         phone:
 *           type: string
 *           description: User's phone number
 *         password:
 *           type: string
 *           description: User's password
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       '200':
 *         description: User registered successfully
 *       '500':
 *         description: Internal Server Error
 */
router.post("/register", registerValidator, validate, UserController.register);

/**
 * @swagger
 * /api/users/verify:
 *   post:
 *     summary: Verify a user with OTP
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserVerification'
 *     responses:
 *       '200':
 *         description: User verified successfully
 *       '500':
 *         description: Internal Server Error
 */
router.post("/verify", userVerifyValidator, validate, UserController.userVerification);

/**
 * @swagger
 * /api/users/resend-verification:
 *   put:
 *     summary: Resend verification code to a user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserResendVerificationCode'
 *     responses:
 *       '200':
 *         description: Verification code resent successfully
 *       '500':
 *         description: Internal Server Error
 */
router.put("/resend-verification", userResendVerificationCodeValidator, UserController.resendVerificationCode);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: null
 *               data:
 *                 token: "example-jwt-token"
 *       '500':
 *         description: Internal Server Error
 */
router.post("/login", loginValidator, validate, UserController.login);

router.use(passport.authenticate("jwt", { session: false }))

/**
 * @swagger
 * /api/users/list:
 *   get:
 *     summary: Get a list of users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal Server Error
 *       '401':
 *         description: Unauthorized
 */
router.get("/list", UserController.getUserList);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user details by ID with itineraries
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal Server Error
 */
router.get("/:id", paramsIdValidator, UserController.getUserDetailsById);


/**
 * @swagger
 * /api/users/force-verify:
 *   put:
 *     summary: Force verify an user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserForceVerify'
 *     responses:
 *       '200':
 *         description: User forced verified
 *       '500':
 *         description: Internal Server Error
 */
router.patch("/force-verify", UserController.forceVerifyUser);

export default router;