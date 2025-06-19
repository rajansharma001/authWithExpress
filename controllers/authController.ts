import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/userSchema.ts";
interface Props {
  email: string;
  name: string;
  password: string;
  role: string;
}

export const signInController = async (req, res) => {
  const { email, password } = req.body as Props;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(404).json({
      msg: "user not registered with provided email. Please register fisrt",
    });
  }

  const matchHashPassword = await bcrypt.compare(
    password,
    existingUser?.password
  );

  if (!matchHashPassword) {
    return res.status(401).json({ msg: "Password did not match!" });
  }

  //   jwt config

  const token = jwt.sign(
    {
      id: existingUser?.id,
      name: existingUser?.name,
      email: existingUser?.email,
      role: existingUser?.role,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  return res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    })
    .status(200)
    .json({
      msg: "Loggedin Success",
      token,
    });
};

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(401).json({
      msg: `${email} is already registered. Please proceed to login.`,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = {
    name: name,
    email: email,
    password: hashedPassword,
    role: role,
  };

  const token = jwt.sign(
    {
      name: newUser.name,
      email: newUser.email,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  const addNewUser = await User.create(newUser);
  await addNewUser.save();

  return res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    })
    .status(201)
    .json({
      msg: "Register Success!",
      newUser,
      Token: token,
      "All Users": User,
    });
};
