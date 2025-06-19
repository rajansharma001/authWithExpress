import type { Request, Response, NextFunction } from "express";

export const signupValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(404)
        .json({ msg: "Please fillup the form to proceed!" });
    }

    const checkEmail = /\@/.test(email);
    if (!checkEmail) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be 6 char long" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};
