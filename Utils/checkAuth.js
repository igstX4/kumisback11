import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

    if (!token) {
        return res.status(403).json({
            message: "Нет доступа",
        });
    }
    try {
        const { _id } = jwt.verify(token, "secret123");
        req.userId = _id;
        next();
    } catch (err) {
        return res.status(403).json({
            message: "Нет доступа",
        });
    }
};
export default checkAuth;