import { NextFunction, Request, Response } from "express";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;
  token === "autenticado"
    ? next()
    : res.status(400).json({ message: "Authentication needed" });
};

export default auth;
