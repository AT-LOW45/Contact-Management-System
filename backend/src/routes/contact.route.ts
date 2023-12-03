import { MissingFieldsError, ResourceNotFoundError } from "@/errors";
import { CreateUpdateContactRequestSchema } from "@/schema/contact.schema";
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
    const isValidRequest = CreateUpdateContactRequestSchema.safeParse(contactDetails).success;

    if (!isValidRequest) {
      throw new MissingFieldsError("Invalid data. Please double check", 400);
    }

    const newContactId = (await contactService.saveContact(contactDetails)).id;
    res.status(200).send({ message: "Contact created successfully", new_contact_id: newContactId });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req: Request<{ contactId: string }>, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = req.body;
    const isValidRequest = CreateUpdateContactRequestSchema.safeParse(contact).success;

    if (!contactId) {
      throw new ResourceNotFoundError("Please provide a contact ID", 400);
    }

    if (!isValidRequest) {
      throw new MissingFieldsError("Invalid request", 400);
    }

    await contactService.updateContact(parseInt(contactId), contact);
    res.status(200).send({ message: `Contact ${contactId} updated successfully` });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req: Request<{ contactId: string }>, res, next) => {
  try {
    const contactId = req.params.contactId;

    if (!contactId) {
      throw new ResourceNotFoundError("Please provide a contact ID", 400);
    }

    await contactService.deleteContactById(parseInt(contactId));
    res.status(200).send({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
