import jwt from "jsonwebtoken";
import User from "../db/models/users.js";
import responseBody from "../utils/responseBody.js";

const authorize = async (req, res, next) => {
  let token;
  token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return responseBody(res, 401, false, "Not authorized, Invalid token");
    }
  } else {
    return responseBody(res, 401, false, "Not authorized, No token");
  }
};

export { authorize };
