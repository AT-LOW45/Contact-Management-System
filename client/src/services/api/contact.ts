import { Contact } from "@/types";
import axios from "axios";
import ENDPOINTS from "../endpoints";
import { sprintf } from "sprintf-js";

export const getAllContacts = async () => {
  return (await axios.get(ENDPOINTS.getAllContacts)).data as Contact[];
};

export const saveContact = async (contact: Omit<Contact, "id">) => {
  return (await axios.post(ENDPOINTS.saveContact, contact)).data as { message: string; new_contact_id: number };
};

export const updateContact = async (contact: Contact) => {
  return (await axios.put(sprintf(ENDPOINTS.updateContact, contact.id), contact)).data as { message: string };
};

export const deleteContact = async (contactId: number) => {
  return await axios.delete(sprintf(ENDPOINTS.deleteContact, contactId));
};
