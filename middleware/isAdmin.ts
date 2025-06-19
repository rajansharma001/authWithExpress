import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ msg: "Token not found" });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("decoded data: ", decoded);
    req.user = decoded;

    if (decoded.role !== "admin")
      return res.status(403).json({
        msg: "Access denied: You are not allow to access this content",
      });
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};
