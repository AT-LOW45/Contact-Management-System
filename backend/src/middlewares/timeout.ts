import { NextFunction, Request, Response } from "express";

const timeoutMiddleware = (_: Request, res: Response, next: NextFunction) => {
  // 1 minute before requests time out
  res.setTimeout(60000, () => {
    res.send({ message: "Timeout occurred. Please try again later" });
  });

  next();
};

export default timeoutMiddleware;
