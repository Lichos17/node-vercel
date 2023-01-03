import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user";
import jwt, { Secret, VerifyOptions } from "jsonwebtoken";
import config from "../config/config";
import { promisify } from "util";
import Product from "../models/product";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.create(req.body);

    return res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      msg: "Algo salio mal",
    });
  }
};
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(req.body);

  try {
    const product = await Product.findByIdAndUpdate(id, req.body);

    return res.status(200).json({
      status: "success",
      data: { product },
    });
  } catch {
    return res.status(500).json({
      status: "error",
      msg: "Algo salio mal",
    });
  }
};
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      msg: "Algo salio mal",
    });
  }
};
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.findByIdAndDelete(req.body.id);

    return res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      msg: "Algo salio mal",
    });
  }
};
