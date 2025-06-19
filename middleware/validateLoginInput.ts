import type { Request, Response, NextFunction } from "express";

interface Props {
  email: string;
  password: string;
}
export const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body as Props;
  try {
    if (!email || !password) {
      return res.status(404).send("please provided required credentials");
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
    console.log(error);
  }
};
