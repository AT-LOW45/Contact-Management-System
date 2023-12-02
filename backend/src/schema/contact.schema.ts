import { z as zod } from "zod";

export const CreateContactRequestSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  phone_number: zod.string(),
});
