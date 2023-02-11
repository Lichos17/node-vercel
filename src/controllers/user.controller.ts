import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config/config";

function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: "1h",
  });
}

type SignUp = {
  email: string;
  password: string;
  name: string;
  passwordConfirm: string;
};

export const signUp = async (
  req: Request<any, any, SignUp, any>,
  res: Response
) => {
  const { email, password, name, passwordConfirm } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      status: "error",
      msg: "Please, provide your email, password and name",
    });
  }

  const user = await User.findOne({ email });

  if (user)
    return res
      .status(400)
      .json({ status: "error", msg: "El usuario ya existe." });

  const newUser = new User({ email, password, name, passwordConfirm });

  await newUser.save();

  const token = createToken(newUser);

  return res.status(200).json({
    status: "success",
    token,

    data: { user: { ...newUser.toObject(), password: undefined } },
  });
};

type SignIn = {
  email: string;
  password: string;
};

export const signIn = async (
  req: Request<any, any, SignIn, any>,
  res: Response
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      msg: "Please, provide your email, password and name",
    });
  }

  const user = await User.findOne({ email });

  if (!user)
    return res
      .status(400)
      .json({ status: "error", msg: "The user does not exist" });

  const hasMatch = await user.comparePasswords(password);

  if (!hasMatch)
    return res
      .status(400)
      .json({ status: "error", msg: "Revisa tus credenciales." });

  const token = createToken(user);

  return res.status(200).json({
    status: "success",
    token,
    data: { user: { ...user.toObject(), password: undefined } },
  });
};

export const userInfo = async (
  req: Request<any, any, SignIn, any>,
  res: Response
) => {
  const user = req.user as IUser;
  res.statusCode = 200;
  return res.json({
    status: "success",
    data: { user: { ...user, password: undefined } },
  });
};
