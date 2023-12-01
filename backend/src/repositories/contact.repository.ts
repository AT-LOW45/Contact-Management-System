import { prisma } from "@/app";
import { Contact } from "@prisma/client";

interface ContactRepository {
  getAllContacts: () => Promise<Contact[]>;
}

const contactRepository: ContactRepository = {
  getAllContacts: async () => {
    return await prisma.contact.findMany();
  },
};

export default contactRepository;
