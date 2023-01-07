import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user";
import jwt, { Secret } from "jsonwebtoken";
import config from "../config/config";
import { promisify } from "util";

function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: 86400,
  });
}

export const signUp = async (req: Request, res: Response) => {
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
      .json({ status: "error", msg: "The user already exists" });

  const newUser = new User({ email, password, name, passwordConfirm });

  await newUser.save();

  const token = createToken(newUser);

  return res.status(200).json({
    status: "success",
    token,
    data: { user: { ...newUser.toObject(), password: undefined } },
  });
};

export const signIn = async (req: Request, res: Response) => {
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
      .json({ status: "error", msg: "Please verify your credentials" });

  const token = createToken(user);

  return res.status(200).json({
    status: "success",
    token,
    data: { user: { ...user.toObject(), password: undefined } },
  });
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).send({
      status: "error",
      msg: "No tienes permitido ingresar a esta ruta",
    });
  }

  const signToken = promisify<string, Secret>(jwt.verify);
  const decoded: unknown = await signToken(token, config.jwtSecret);

  const user = User.findOne({ email: (decoded as { email: string }).email });

  req.user = user;

  next();
};
