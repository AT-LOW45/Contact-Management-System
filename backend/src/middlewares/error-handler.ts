import { NextFunction, Request, Response } from "express";

const errorHandlerMiddleware = (error: Error, _: Request, res: Response, next: NextFunction) => {
  const errMsg = error.message || "Something went wrong";
  res.status(res.statusCode || 500).json({
    success: false,
    status: res.statusCode || 500,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? error.stack : {},
  });
  next();
};

export default errorHandlerMiddleware;
