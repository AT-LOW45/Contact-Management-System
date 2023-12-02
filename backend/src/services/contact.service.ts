import { contactRepository } from "@/repositories";
import { Contact } from "@prisma/client";

interface ContactService {
  getAllContacts: () => Promise<Contact[]>;
  saveContact: (newContact: Omit<Contact, "id">) => Promise<Contact>;
  updateContact: (contactId: number, updatedContact: Omit<Contact, "id">) => Promise<Contact>;
}

const contactService: ContactService = {
  getAllContacts: async () => contactRepository.getAllContacts(),
  saveContact: async (newContact) => contactRepository.saveContact(newContact),
  updateContact: async (contactId, updatedContact) => contactRepository.updateContactById(contactId, updatedContact),
};

export default contactService;
