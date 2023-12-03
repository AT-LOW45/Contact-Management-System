import { z as zod } from "zod";

export const CreateUpdateContactRequestSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  phone_number: zod.string(),
});
