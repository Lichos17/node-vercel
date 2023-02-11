import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import jwt, { Secret } from "jsonwebtoken";
import config from "../config/config";
import { promisify } from "util";

export const protectRoute = async (
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

  try {
    const signToken = promisify<string, Secret>(jwt.verify);
    const decoded: unknown = await signToken(token, config.jwtSecret);

    const user = await User.findOne({
      email: (decoded as { email: string }).email,
    });

    if (!user) {
      res.statusCode = 404;
      return res.json({
        status: "error",
        msg: "No se encontro al usuario con el email dado.",
      });
    }

    req.user = user.toObject();

    next();
  } catch (err: any) {
    console.log(err.message);

    res.statusCode = 402;
    return res.json({
      status: "error",
      msg: "Something went wrong.",
    });
  }
};
