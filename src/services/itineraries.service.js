import { ItinerariesModel } from "../schemas/itineraries.schema.js";
import { BadRequestException, NotFoundException, UnauthorizedException } from "../utils/http.exception.js";

export class ItinerariesService {
    static async createItinerary({ body, user }) {
        let createPayload = { ...body, user: user._id };
        return await ItinerariesModel.create({ ...createPayload, createdBy: user._id });
    }

    static async getAllItineraries({ user, query }) {
        if (!user?.isAdmin)
            throw UnauthorizedException("You are not authorized to perform this action!");
        let { limit } = query || 50;
        const itineraries = await ItinerariesModel.find().sort({ createdAt: -1 }).limit(limit);
        return itineraries;
    }

    static async getSingleItinerary({ params, user }) {
        const itinerary = await ItinerariesModel.findById(params.id);
        if (!itinerary) {
            throw NotFoundException("Itinerary not found");
        }
        if (!user?.isAdmin && user._id.toString() != itinerary.user.toString()) {
            throw UnauthorizedException("You are not authorized to access this data!");
        }
        return itinerary;
    }


    static async getUserItineraries({ user }) {
        const itineraries = await ItinerariesModel.find({ user: user._id }).sort({ createdAt: -1 });
        return itineraries;
    }

    static async getItinerariesByUserId({ params, user }) {
        if (!user?.isAdmin && user._id.toString() != params.userId.toString()) {
            throw UnauthorizedException("You are not authorized to perform this action!");
        }
        const itineraries = await ItinerariesModel.find({ user: params.userId }).sort({ createdAt: -1 });
        return itineraries;
    }

    static async updateItinerary({ params, body, user }) {
        const itinerary = await ItinerariesModel.findById(params.id);
        if (!itinerary) throw NotFoundException("Itinerary data not found");
        if (!user.isAdmin && itinerary.user.toString() != user._id.toString())
            throw UnauthorizedException("You are not authorized to update this data!");
        Object.assign(itinerary, body);
        await itinerary.save();
        return "Itinerary data updated";
    }

    static async deleteItinerary({ params, user }) {
        const itinerary = await ItinerariesModel.findById(params.id);
        if (!user.isAdmin && user._id.toString() != itinerary.user.toString())
            throw UnauthorizedException("You are not authorized to perform this action!");
        if (!itinerary) throw NotFoundException("Itinerary not found");
        await itinerary.remove();
        return "Itinerary data deleted";
    }


}