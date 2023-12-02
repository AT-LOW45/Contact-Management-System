import { PrismaClient } from "@prisma/client";
import express, { Application } from "express";
import contacts from "../prisma/dummy";
import { errorHandlerMiddleware, timeoutMiddleware } from "./middlewares";
import { contactRouter } from "./routes";

const app: Application = express();
const port = process.env.PORT || 8000;
const prisma = new PrismaClient();

const connectPrisma = async () => {
  // create dummy contact data records
  contacts.forEach(async (contact) => {
    await prisma.contact.upsert({
      where: { name: contact.name, email: contact.email, phone_number: contact.phone_number },
      update: {},
      create: {
        name: contact.name,
        email: contact.email,
        phone_number: contact.phone_number,
      },
    });
  });
};

connectPrisma()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

app.get("/", (_, res) => {
  res.redirect("/contact");
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(timeoutMiddleware);
app.use(errorHandlerMiddleware);

// routes
app.use("/contact", contactRouter);

app.listen(port, () => {
  console.log(`Server up and running at http://localhost:${port}`);
});

export { app, prisma };
