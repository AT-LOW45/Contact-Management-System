import { Container, List } from "@mui/material";
import { useEffect, useState } from "react";
import { Contact } from "./types";
import { getAllContacts } from "./services";

function App() {
  const [contacts, setContacts] = useState<Contact[]>();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const foundContacts = await getAllContacts();
        setContacts(foundContacts);
        console.log(foundContacts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContacts();
  }, []);

  return (
    <Container maxWidth="xl" component="main">
      <List></List>
    </Container>
  );
}

export default App;
