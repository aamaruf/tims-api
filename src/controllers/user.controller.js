import { UserService } from "../services/user.service.js";

export class UserController {
    static async register(req, res, next) {
        try {
            const data = await UserService.register(req?.body);
            res.json({
                status: 200,
                message: "Registration successfull!",
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const data = await UserService.login(req?.body);
            res.json({
                status: 200,
                message: null,
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async getUserDetailsById(req, res, next) {
        try {
            if (!req?.user?.isAdmin && req?.user?._id != req?.params?.id)
                throw new Error("You are not authorized to get this data!")
            const data = await UserService.getUserDetailsById(req?.params?.id)
            res.json({
                status: 200,
                message: "user details fetched",
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async getUserList(req, res, next) {
        try {
            const data = await UserService.getUserList(req);
            res.json({
                status: 200,
                message: "user list fetched",
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async userVerification(req, res, next) {
        try {
            const data = await UserService.userVerification(req?.body);
            return res.json({
                status: 200,
                message: "User verified successfully",
                data
            })
        } catch (error) {
            next(error);
        }
    }

    static async resendVerificationCode(req, res, next) {
        try {
            const data = await UserService.resendVerificationCode(req?.body);
            return res.json({
                status: 200,
                message: data
            })
        } catch (error) {
            next(error);
        }
    }

    static async forceVerifyUser(req, res, next) {
        try {
            const data = await UserService.forceVerifyUser(req);
            return res.json({
                status: 200,
                message: "User verified successfully",
                data
            })
        } catch (error) {
            next(error);
        }
    }
}