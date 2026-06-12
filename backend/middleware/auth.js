import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const protect = async (req, res, next) => {
    try {
        let token;

        console.log("AUTH HEADER:", req.headers.authorization);

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        console.log("TOKEN:", token);

        if (!token) {
            return res
                .status(401)
                .json({ message: "Not authorized, no token" });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );

        console.log("DECODED:", decoded);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res
                .status(401)
                .json({ message: "User no longer exists" });
        }

        req.user = user;

        next();
    } catch (err) {

        console.log("JWT ERROR:", err);

        return res
            .status(401)
            .json({ message: "Not authorized, token invalid" });
    }
};