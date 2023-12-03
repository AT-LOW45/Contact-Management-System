import { Contact } from "@/types";
import axios from "axios";
import ENDPOINTS from "../endpoints";

export const getAllContacts = async () => {
  return (await axios.get(ENDPOINTS.getAllContacts)).data as Contact[];
};

export const saveContact = async (contact: Omit<Contact, "id">) => {
  return (await axios.post(ENDPOINTS.saveContact, contact)).data as { message: string; new_contact_id: number };
};
