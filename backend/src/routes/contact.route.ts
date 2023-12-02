import { CreateContactRequestSchema } from "@/schema/contact.schema";
import { contactService } from "@/services";
import express, { Request } from "express";

const router = express.Router();

router.get("/", async (_, res, next) => {
  try {
    const contacts = await contactService.getAllContacts();
    res.status(200).send(contacts);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const contactDetails = req.body;
    const isValidResponse = CreateContactRequestSchema.safeParse(contactDetails).success;

    if (!isValidResponse) {
      return res.status(400).send({ message: "Invalid data. Please double check" });
    }

    const newContactId = (await contactService.saveContact(contactDetails)).id;
    res.status(200).send({ message: "Contact created successfully", new_contact_id: newContactId });
  } catch (error) {
    next(error);
  }
});

router.patch("/", async (req: Request<{ contactId: number }>, res, next) => {
  try {
    const contactId = req.params.contactId;

    if (!contactId) {
      return res.status(400).send({ message: "Contact not found" });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
