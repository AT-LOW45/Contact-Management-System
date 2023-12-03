const baseUrl = import.meta.env.VITE_ENDPOINT_BASE_URL;

console.log(baseUrl);

const ENDPOINTS = {
  getAllContacts: `${baseUrl}/contact/`,
  saveContact: `${baseUrl}/contact/`,
  updateContact: `${baseUrl}/contact/%s/`,
  deleteContact: `${baseUrl}/contact/%s/`,
} as const;

export default ENDPOINTS;
