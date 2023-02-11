import { Request, Response } from "express";
import Bought from "../models/bought";
import { IUser } from "../models/user";

export const createBought = async (
  req: Request<any, any, { property: string }, any>,
  res: Response
) => {
  const user = req.user as IUser;

  const { property } = req.body;

  if (!property) {
    res.statusCode = 400;
    return res.json({
      status: "error",
      msg: "Debes proveer una propiedad.",
    });
  }

  try {
    const bought = await Bought.create({ user: user._id, property: property });
    res.statusCode = 200;
    return res.json({
      status: "success",
      data: { bought },
    });
  } catch (err) {
    res.statusCode = 500;
    return res.json({
      status: "error",
      msg: "Algo ha salido mal.",
    });
  }
};

export const getBoughts = async (
  req: Request<any, any, any, any>,
  res: Response
) => {
  const user = req.user as IUser;

  try {
    const boughts = await Bought.find({ user: user._id });
    res.statusCode = 200;
    return res.json({
      status: "success",
      data: { boughts },
    });
  } catch (err) {
    res.statusCode = 500;
    return res.json({
      status: "error",
      msg: "Algo ha salido mal.",
    });
  }
};
