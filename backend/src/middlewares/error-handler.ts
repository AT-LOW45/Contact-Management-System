import { NextFunction, Request, Response } from "express";

const errorHandlerMiddleware = (error: Error, _: Request, res: Response, next: NextFunction) => {
  const message = error.message || "Something went wrong";
  const status = error.status;
  const stack = error.stack;

  res.status(status || 500).json({
    success: false,
    status: status || 500,
    message,
    stack,
  });
  return next();
};

export default errorHandlerMiddleware;
