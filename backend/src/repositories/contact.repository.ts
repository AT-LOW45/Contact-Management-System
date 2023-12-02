import { prisma } from "@/app";
import { Contact } from "@prisma/client";

interface ContactRepository {
  getAllContacts: () => Promise<Contact[]>;
  saveContact: (contact: Omit<Contact, "id">) => Promise<Contact>;
  updateContactById: (contactId: number, updatedContact: Omit<Contact, "id">) => Promise<Contact>;
}

const contactRepository: ContactRepository = {
  getAllContacts: async () => {
    return await prisma.contact.findMany();
  },
  saveContact: async (contact) => {
    return await prisma.contact.create({ data: contact });
  },
  updateContactById: async (contactId, updatedContact) => {
    return await prisma.contact.update({ where: { id: contactId }, data: updatedContact });
  },
};

export default contactRepository;
