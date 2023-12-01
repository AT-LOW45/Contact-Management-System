import { contactRepository } from "@/repositories";
import { Contact } from "@prisma/client";

interface ContactService {
  getAllContacts: () => Promise<Contact[]>;
}

const contactService: ContactService = {
  getAllContacts: async () => contactRepository.getAllContacts(),
};

export default contactService;
