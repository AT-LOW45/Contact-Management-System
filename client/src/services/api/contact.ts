import { Contact } from "@/types";
import axios from "axios";
import ENDPOINTS from "../endpoints";

export const getAllContacts = async () => {
  return (await axios.get(ENDPOINTS.getAllContacts)).data as Contact[];
};
