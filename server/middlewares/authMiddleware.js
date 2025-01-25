import jwt from "jsonwebtoken";

const protect = (roles = []) => (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) throw new Error("Not authorized, no token");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (roles.length && !roles.includes(decoded.role)) {
            throw new Error("Not authorized for this route");
        }

        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};


const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as an admin" });
    }
};


export { protect, admin };
