import { ResourceNotFoundError } from "@/errors";
import { contactRepository } from "@/repositories";
import { Contact } from "@prisma/client";

interface ContactService {
  getAllContacts: () => Promise<Contact[]>;
  getContactById: (contactId: number) => Promise<Contact | null>;
  saveContact: (newContact: Omit<Contact, "id">) => Promise<Contact>;
  updateContact: (contactId: number, updatedContact: Omit<Contact, "id">) => Promise<Contact>;
  deleteContactById: (contactId: number) => Promise<void>;
}

const contactService: ContactService = {
  getAllContacts: async function () {
    return await contactRepository.getAllContacts();
  },
  getContactById: async function (contactId) {
    const foundContact = await contactRepository.getContactById(contactId);
    return foundContact;
  },
  saveContact: async function (newContact) {
    return await contactRepository.saveContact(newContact);
  },
  updateContact: async function (contactId, updatedContact) {
    const foundContact = await this.getContactById(contactId);

    if (!foundContact) {
      throw new ResourceNotFoundError("Contact not found", 404);
    }

    return await contactRepository.updateContactById(contactId, updatedContact);
  },
  deleteContactById: async function (contactId) {
    const foundContact = await this.getContactById(contactId);

    if (!foundContact) {
      throw new ResourceNotFoundError("Contact not found", 404);
    }

    await contactRepository.deleteContactById(contactId);
  },
};

export default contactService;
