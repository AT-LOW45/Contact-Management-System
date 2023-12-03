import { prisma } from "@/app";
import { Contact } from "@prisma/client";

interface ContactRepository {
  getAllContacts: () => Promise<Contact[]>;
  getContactById: (contactId: number) => Promise<Contact | null>;
  saveContact: (contact: Omit<Contact, "id">) => Promise<Contact>;
  updateContactById: (contactId: number, updatedContact: Omit<Contact, "id">) => Promise<Contact>;
  deleteContactById: (contactId: number) => Promise<void>;
}

const contactRepository: ContactRepository = {
  getAllContacts: async function () {
    return await prisma.contact.findMany();
  },
  getContactById: async function (contactId) {
    return await prisma.contact.findFirst({ where: { id: contactId } });
  },
  saveContact: async function (contact) {
    return await prisma.contact.create({ data: contact });
  },
  updateContactById: async function (contactId, updatedContact) {
    return await prisma.contact.update({ where: { id: contactId }, data: updatedContact });
  },
  deleteContactById: async function (contactId) {
    await prisma.contact.delete({ where: { id: contactId } });
  },
};

export default contactRepository;
