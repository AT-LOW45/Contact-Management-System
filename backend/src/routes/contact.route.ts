import { contactService } from "@/services";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const contacts = await contactService.getAllContacts();
  res.send(contacts).status(200);
});

export default router;
