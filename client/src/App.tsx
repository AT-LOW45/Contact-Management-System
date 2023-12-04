import { DeleteOutline } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Contact } from "./types";
import useContact from "./useContact";

function App() {
  const {
    changeContact,
    contacts,
    createContact,
    errorSnackbarMessage,
    isConfirmDeleteContactDialogOpen,
    isCreateContactDialogOpen,
    isErrorSnackbarOpen,
    isSuccessSnackbarOpen,
    isUpdateContactDialogOpen,
    removeContact,
    selectedContactToDelete,
    selectedContactToUpdate,
    setIsConfirmDeleteContactDialogOpen,
    setIsCreateContactDialogOpen,
    setIsErrorSnackBarOpen,
    setIsSuccessSnackBarOpen,
    setIsUpdateContactDialogOpen,
    setSelectedContactToDelete,
    setSelectedContactToUpdate,
    successSnackbarMessage,
  } = useContact();

  const updateField = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, key: keyof Contact) => {
    if (selectedContactToUpdate) {
      setSelectedContactToUpdate((currentValue) => ({ ...currentValue!, [key]: event.target.value }));
    }
  };

  const handleSuccessClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSuccessSnackBarOpen(false);
  };

  const handleErrorClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setIsErrorSnackBarOpen(false);
  };

  return (
    <Container maxWidth="xl" component="main">
      <Snackbar autoHideDuration={5000} open={isSuccessSnackbarOpen} onClose={handleSuccessClose}>
        <Alert variant="filled" severity="success" onClose={handleSuccessClose}>
          {successSnackbarMessage}
        </Alert>
      </Snackbar>

      <Snackbar autoHideDuration={5000} open={isErrorSnackbarOpen} onClose={handleErrorClose}>
        <Alert variant="filled" severity="error" onClose={handleErrorClose}>
          {errorSnackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog
        fullWidth
        component="form"
        onSubmit={createContact}
        maxWidth="md"
        open={isCreateContactDialogOpen}
        onClose={() => setIsCreateContactDialogOpen(false)}
      >
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent>
          <Stack direction="column" gap={3}>
            <TextField fullWidth label="Name" name="name" variant="standard" />
            <TextField fullWidth label="Email" name="email" type="email" variant="standard" />
            <TextField fullWidth label="Phone number" name="phoneNumber" type="tel" variant="standard" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateContactDialogOpen(false)}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="md"
        open={isUpdateContactDialogOpen}
        onClose={() => setIsUpdateContactDialogOpen(false)}
      >
        <DialogTitle>Contact - {selectedContactToUpdate?.name}</DialogTitle>
        <DialogContent>
          <Stack direction="column" gap={3}>
            <TextField
              required
              fullWidth
              label="Name"
              variant="standard"
              value={selectedContactToUpdate?.name}
              onChange={(event) => updateField(event, "name")}
            />
            <TextField
              required
              fullWidth
              label="Email"
              type="email"
              variant="standard"
              value={selectedContactToUpdate?.email}
              onChange={(event) => updateField(event, "email")}
            />
            <TextField
              required
              fullWidth
              label="Phone number"
              type="tel"
              variant="standard"
              value={selectedContactToUpdate?.phone_number}
              onChange={(event) => updateField(event, "phone_number")}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsUpdateContactDialogOpen(false)}>Cancel</Button>
          <Button onClick={changeContact}>Update</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isConfirmDeleteContactDialogOpen}
        onClose={() => {
          setIsConfirmDeleteContactDialogOpen(false);
        }}
      >
        <DialogTitle>Delete Contact</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete contact{" "}
            <Typography component="span" sx={{ fontWeight: "bold", display: "inline-block" }}>
              {selectedContactToDelete?.id}
            </Typography>
            ? Deleted contacts cannot be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            onClick={() => {
              setIsConfirmDeleteContactDialogOpen(false);
            }}
          >
            No, go back
          </Button>
          <Button variant="contained" color="error" onClick={removeContact}>
            Yes, I'm sure
          </Button>
        </DialogActions>
      </Dialog>

      <Stack direction="column" gap={5} sx={{ marginY: "3rem" }}>
        <Typography variant="h3">Contact Management System</Typography>
        <List>
          {contacts.length === 0 ? (
            <Typography sx={{ textAlign: "center", color: "gray" }} variant="h5">
              No contacts available
            </Typography>
          ) : (
            contacts.map((contact) => (
              <ListItem
                key={contact.id}
                secondaryAction={
                  <Stack direction="row">
                    <IconButton
                      onClick={() => {
                        setSelectedContactToUpdate(contact);
                        setIsUpdateContactDialogOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setSelectedContactToDelete(contact);
                        setIsConfirmDeleteContactDialogOpen(true);
                      }}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={contact.name}
                  secondary={
                    <Stack direction="row" justifyContent="start" gap={3} component="span">
                      <Typography component="span">{contact.email}</Typography>
                      <Typography component="span">{contact.phone_number}</Typography>
                    </Stack>
                  }
                />
              </ListItem>
            ))
          )}
        </List>
      </Stack>
      <Button
        variant="contained"
        endIcon={<AddIcon />}
        sx={{ display: "flex", marginX: "auto" }}
        onClick={() => setIsCreateContactDialogOpen(true)}
      >
        Add Contact
      </Button>
    </Container>
  );
}

export default App;
