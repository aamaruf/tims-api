import { ItinerariesService } from "../services/itineraries.service.js";

export class ItinerariesController {
    static async createItinerary(req, res, next) {
        try {
            const data = await ItinerariesService.createItinerary(req);
            res.status(201).json({
                status: 201,
                message: "New travel itinerary created!"
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllItineraries(req, res, next) {
        try {
            const data = await ItinerariesService.getAllItineraries(req);
            res.status(200).json({
                status: 200,
                message: null,
                data: data || []
            })
        } catch (error) {
            next(error)
        }
    }

    static async getSingleItinerary(req, res, next) {
        try {
            const data = await ItinerariesService.getSingleItinerary(req);
            res.status(200).json({
                status: 200,
                message: null,
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async getUserItineraries(req, res, next) {
        try {
            const data = await ItinerariesService.getUserItineraries(req);
            res.status(200).json({
                status: 200,
                message: null,
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async getItinerariesByUserId(req, res, next) {
        try {
            const data = await ItinerariesService.getItinerariesByUserId(req);
            res.status(200).json({
                status: 200,
                message: null,
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateItinerary(req, res, next) {
        try {
            const data = await ItinerariesService.updateItinerary(req);
            res.status(200).json({
                status: 200,
                message: "Itinerary updated successfully",
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteItinerary(req, res, next) {
        try {
            const data = await ItinerariesService.deleteItinerary(req);
            res.status(200).json({
                status: 200,
                message: "Itinerary data deleted",
                data
            })
        } catch (error) {
            next(error)
        }
    }
}