import { useState, useCallback, useEffect, FormEvent } from "react";
import { getAllContacts, saveContact, updateContact, deleteContact } from "./services";
import { Contact } from "./types";

const useContact = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactToDelete, setSelectedContactToDelete] = useState<Contact>();
  const [selectedContactToUpdate, setSelectedContactToUpdate] = useState<Contact>();
  const [isCreateContactDialogOpen, setIsCreateContactDialogOpen] = useState(false);
  const [isUpdateContactDialogOpen, setIsUpdateContactDialogOpen] = useState(false);
  const [isSuccessSnackbarOpen, setIsSuccessSnackBarOpen] = useState(false);
  const [isErrorSnackbarOpen, setIsErrorSnackBarOpen] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");
  const [successSnackbarMessage, setSuccessSnackbarMessage] = useState("");
  const [isConfirmDeleteContactDialogOpen, setIsConfirmDeleteContactDialogOpen] = useState(false);

  const fetchContacts = useCallback(async () => {
    try {
      const foundContacts = await getAllContacts();
      setContacts(foundContacts);
    } catch (error) {
      setErrorSnackbarMessage("Error fetching contacts");
      setIsErrorSnackBarOpen(true);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const createContact = async (event: FormEvent) => {
    try {
      event.preventDefault();
      const form = event.currentTarget as unknown as HTMLFormElement;

      const name = (form[0] as HTMLInputElement).value;
      const email = (form[1] as HTMLInputElement).value;
      const phoneNumber = (form[2] as HTMLInputElement).value;

      const newContactInfo = await saveContact({ name, email, phone_number: phoneNumber });
      setIsCreateContactDialogOpen(false);
      setSuccessSnackbarMessage(newContactInfo.message);
      setIsSuccessSnackBarOpen(true);
      fetchContacts();
    } catch (error) {
      setErrorSnackbarMessage("Unable to save contact. Please try again later");
      setIsErrorSnackBarOpen(true);
    }
  };

  const changeContact = async () => {
    if (selectedContactToUpdate) {
      try {
        const updatedContactInfo = await updateContact(selectedContactToUpdate);
        setSuccessSnackbarMessage(updatedContactInfo.message);
        setIsSuccessSnackBarOpen(true);
        setIsUpdateContactDialogOpen(false);
        fetchContacts();
      } catch (error) {
        setErrorSnackbarMessage("Unable to update contact. Please try again later");
        setIsErrorSnackBarOpen(true);
      }
    }
  };

  const removeContact = async () => {
    if (selectedContactToDelete) {
      try {
        await deleteContact(selectedContactToDelete.id);
        setIsConfirmDeleteContactDialogOpen(false);
        fetchContacts();
      } catch (error) {
        console.log(error);
        setErrorSnackbarMessage("Unable to delete contact. Please try again later");
        setIsErrorSnackBarOpen(true);
      }
    }
  };

  return {
    contacts,
    setContacts,
    selectedContactToDelete,
    setSelectedContactToDelete,
    selectedContactToUpdate,
    setSelectedContactToUpdate,
    isCreateContactDialogOpen,
    setIsCreateContactDialogOpen,
    isUpdateContactDialogOpen,
    setIsUpdateContactDialogOpen,
    isSuccessSnackbarOpen,
    setIsSuccessSnackBarOpen,
    isErrorSnackbarOpen,
    setIsErrorSnackBarOpen,
    errorSnackbarMessage,
    setErrorSnackbarMessage,
    successSnackbarMessage,
    setSuccessSnackbarMessage,
    isConfirmDeleteContactDialogOpen,
    setIsConfirmDeleteContactDialogOpen,
    createContact,
    changeContact,
    removeContact,
  };
};

export default useContact;
