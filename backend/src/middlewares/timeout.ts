import { NextFunction, Request, Response } from "express";

const timeoutMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Set the timeout
  const timeoutId = setTimeout(() => {
    res.status(408).send({ message: "Timeout ocurred. Please try again later" });
  }, 8000);

  // Store the original response object
  const originalSend = res.send;
  res.send = function (body) {
    clearTimeout(timeoutId); // Clear the timeout if the response is sent before the timeout occurs
    return originalSend.call(this, body);
  };

  next();
};

export default timeoutMiddleware;
