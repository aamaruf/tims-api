import { Router } from "express";
import passport from "passport";
import { ItinerariesController } from "../controllers/itinaries.controller.js";
import { validate } from "../middlewares/validator/index.js";
import { createItinerariesValidator } from "../middlewares/validator/itineraries.validator.js";
const router = Router();

router.use(passport.authenticate("jwt", { session: false }))
/**
 * @swagger
 * tags:
 *   name: Itineraries
 *   description: Operations related to itineraries
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
 *     CreateItinerary:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the itinerary
 *           example: Winter Vacation
 *         destinations:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of destination names
 *           example: ["Panam City", "Lalbag", "Ahsan Manjil"]
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the itinerary (YYYY-MM-DD)
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the itinerary (YYYY-MM-DD)
 *         members:
 *           type: integer
 *           description: The number of members in the itinerary
 *           example: 11
 *         accommodations:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of accommodation types
 *           example: ["Resort"]
 *         transportations:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of transportation modes
 *           example: ["Rickshaw", "Micro", "Boat"]
 *         activities:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of activity names
 *           example: ["Photoshot", "Lunch", "Raffle Draw", "Sports", "Dance", "Sing"]
 *         note:
 *           type: string
 *           description: Additional notes for the itinerary
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateItinerary:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The updated title of the itinerary
 *         destinations:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of updated destination names
 *         startDate:
 *           type: string
 *           format: date
 *           description: The updated start date of the itinerary (YYYY-MM-DD)
 *         endDate:
 *           type: string
 *           format: date
 *           description: The updated end date of the itinerary (YYYY-MM-DD)
 *         members:
 *           type: integer
 *           description: The updated number of members in the itinerary
 *         accommodations:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of updated accommodation types
 *         transportations:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of updated transportation modes
 *         activities:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of updated activity names
 *         note:
 *           type: string
 *           description: Updated additional notes for the itinerary
 */

/**
 * @swagger
 * /api/itineraries:
 *   post:
 *     summary: Create a new itinerary
 *     tags: [Itineraries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Itinerary data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateItinerary'
 *     responses:
 *       '201':
 *         description: Itinerary created successfully
 *       '401':
 *         description: Unauthorized
 */

router.post("/", createItinerariesValidator, validate, ItinerariesController.createItinerary);

/**
 * @swagger
 * /api/itineraries:
 *   get:
 *     summary: Get logged in user's all itineraries
 *     tags: [Itineraries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of user's itineraries
 *       '500':
 *         description: Internal Server Error
 */
router.get("/", ItinerariesController.getUserItineraries);

/**
 * @swagger
 * /api/itineraries/all:
 *   get:
 *     summary: Get all itineraries [ accessed by admin only ]
 *     tags: [Itineraries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of all itineraries
 *       '500':
 *         description: Internal Server Error
 */
router.get("/all", ItinerariesController.getAllItineraries);

/**
 * @swagger
 * /api/itineraries/single/{id}:
 *   get:
 *     summary: Get a single itinerary by ID
 *     tags: [Itineraries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the itinerary to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Single itinerary retrieved successfully
 *       '404':
 *         description: Itinerary not found
 *       '500':
 *         description: Internal Server Error
 */
router.get("/single/:id", ItinerariesController.getSingleItinerary);

/**
 * @swagger
 * /api/itineraries/user/{userId}:
 *   get:
 *     summary: Get a speciic users itinerary by user ID
 *     tags: [Itineraries]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: user id to retrieve itinerary
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Single itinerary retrieved successfully
 *       '404':
 *         description: Itinerary not found
 *       '500':
 *         description: Internal Server Error
 */
router.get("/user/:userId", ItinerariesController.getItinerariesByUserId);

/**
 * @swagger
 * /api/itineraries/{id}:
 *   put:
 *     summary: Update an existing itinerary
 *     tags: [Itineraries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: user id to retrieve itinerary
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated itinerary data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateItinerary'
 *     responses:
 *       '200':
 *         description: Itinerary updated successfully
 *       '404':
 *         description: Itinerary not found
 *       '500':
 *         description: Internal Server Error
 */
router.put("/:id", ItinerariesController.updateItinerary);

/**
 * @swagger
 * /api/itineraries/delete/{id}:
 *   delete:
 *     summary: Delete an itinerary by ID
 *     tags: [Itineraries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the itinerary to delete
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Itinerary deleted successfully
 *       '404':
 *         description: Itinerary not found
 *       '500':
 *         description: Internal Server Error
 */
router.delete("/delete/:id", ItinerariesController.deleteItinerary);

export default router;