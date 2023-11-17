import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { issueJWT } from "../configs/jwt.js";
import { getPaginationIndex } from "../helpers/pagination_index.helper.js";
import { UserModel } from "../schemas/user.schema.js";
import { BadRequestException, ConflictException, NotFoundException, UnauthorizedException } from "../utils/http.exception.js";
import { otpGen } from "../utils/random.generator.js";
export class UserService {

    static async register(body) {
        const { name, email, password, phone, address } = body;
        const user = await UserModel.findOne({ $or: [ { email }, { phone } ] });
        if (user) throw ConflictException("User already exists");
        const hashPass = await bcrypt.hash(password, 10);
        const verifyCode = otpGen();

        let newUser = new UserModel({
            name,
            email,
            password: hashPass,
            phone,
            address,
            token: verifyCode,
        })

        await newUser.save()
        return {
            message: `Hi ${name}, Verify your account to complete registration`,
            otp: verifyCode,
        }
    }

    static async login(body) {
        const user = await UserModel.findOne({ phone: body.phone });
        if (!user) throw NotFoundException("User not found");
        const isMatch = await bcrypt.compare(body.password, user.password);
        if (!isMatch) throw UnauthorizedException("Invalid phone or password");
        if (!user.isVerified && !user.isAdmin) throw UnauthorizedException("User not verified");
        if (user.isBlocked) throw BadRequestException("Your account has been suspended, please contact admin");
        const tokenPayload = {
            _id: user._id,
            isAdmin: user.isAdmin,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
        }
        return {
            token: issueJWT(tokenPayload),
        }
    }

    static async getUserDetailsById(userId) {
        try {
            const itineraries = await UserModel.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(userId) // Convert userId to ObjectId
                    }
                },
                {
                    $lookup: {
                        from: 'itineraries', // The name of the  collection
                        localField: '_id',
                        foreignField: 'user', // The field in Itinerary that links to User
                        as: 'itinerarie'
                    }
                },
            ]);

            return itineraries;
        } catch (error) {
            // Handle any errors
            console.error(error);
            throw error;
        }
    }

    static async getUserList({ query, user }) {
        if(!user.isAdmin)
            throw UnauthorizedException("You are not authorized to perform this action!")
        const value = {};
        const { q, filter } = query;
        let { page = 1, limit = 10 } = query;
        [ page, limit ] = [ parseInt(page), parseInt(limit) ];

        if (q) {
            value = {
                [ Op.or ]: [
                    { name: { [ Op.iLike ]: `%${q}%` } },
                    { phone: { [ Op.iLike ]: `%${q}%` } },
                    { email: { [ Op.iLike ]: `%${q}%` } },
                ],
            };
        }
        //, end, nextPage, prevPage
        else if (filter) {
            const { startDate, endDate } = filter;
            if (startDate && endDate) {
                if (new Date(startDate) > new Date(endDate)) {
                    throw new BadRequestException(
                        "start date should be less than end date"
                    );
                }
                value = {
                    [ Op.and ]: [
                        { createdAt: { [ Op.gte ]: startDate } },
                        { createdAt: { [ Op.lte ]: endDate } }
                    ]
                }
            }
        }

        const { start, end } = getPaginationIndex({ page, limit });

        const data = await UserModel.find({ query: value, start, limit }).select('-password -__v').sort({ createdAt: -1 }).populate("itineraries");

        if (data.length === 0) throw NotFoundException("User Not Found.");

        const total = await UserModel.countDocuments();

        return {
            limit,
            total,
            nextPage: end < total ? page + 1 : false,
            prevPage: start > 0 ? page - 1 : false,
            users: data,
        };
    };

    static async userVerification(body) {
        const user = await UserModel.findOne({ phone: body.phone });
        if (!user) throw NotFoundException("User not found");
        if (user.isVerified) throw BadRequestException("User already verified. Please login");
        if (user.token !== body.otp) throw UnauthorizedException("Invalid otp");
        user.token = null;
        user.isVerified = true;
        await user.save();
        return {
            message: "User verified. Please login",
        }
    }

    static async resendVerificationCode(body) {
        if (!phone) throw BadRequestException("Phone required");
        const user = await UserModel.findOne({ phone: body.phone });
        if (!user) throw NotFoundException("User not found");
        if (user.isVerified) throw BadRequestException("User already verified");

        user.token = otpGen();
        await user.save();

        return {
            message: "Verification code sent to your phone",
            otp: user.token,
        };
    }

    static async forceVerifyUser({ user, body }) {
        if (!user.isAdmin) throw UnauthorizedException("Only admin can verify user");
        if (!body.userId) throw BadRequestException("User id is required");
        const verifyCandidate = await UserModel.findById(body.userId);
        if (!verifyCandidate) throw NotFoundException("User not found");

        if (!verifyCandidate.isVerified) {
            verifyCandidate.isVerified = true;
        }
        await verifyCandidate.save();
        return "User verified";
    }

}