import Head from "next/head";
import styles from "./manageevents.module.css";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { eventNames } from "process";

const ManageEvents = () => {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventEmail, setEventEmail] = useState("");
  const [eventPrice, setEventPrice] = useState("");

  useEffect(() => {
    const getEvents = async () => {
      const axiosEvents = await axios.get("/api/event");
      setEvents(axiosEvents.data);
    };
    getEvents();
  }, [open]);

  const onNameChange = (a: any) => {
    setEventName(a.target.value);
  };

  const onDescriptionChange = (a: any) => {
    setEventDescription(a.target.value);
  };

  const onEmailChange = (a: any) => {
    setEventEmail(a.target.value);
  };

  const onPriceChange = (a: any) => {
    setEventPrice(a.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddEvent = async () => {
    try {
      const axiosEvent: any = await axios.post("/api/manager/addevent", {
        name: eventName,
        description: eventDescription,
        hostedBy: eventEmail,
        price: eventPrice,
      });
      handleClose();
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };

  return (
    <>
      <Head>
        <title>BPS Event Manager</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.cardRow}>
          <div className={styles.cardMain}>
            <h3>Event Manager</h3>
            <Button
              onClick={handleClickOpen}
              startIcon={<AddIcon />}
              variant="outlined"
            >
              Add Event
            </Button>
          </div>
          {events.map((event: any) =>{
            console.log(event)
            console.log(event.id)
            return (
            <EventCard
              key={event.id}
              id={event.id}
              name={event.name}
              description={event.description}
              price={event.price}
              location={event.location}
              hostedBy={event.hostedBy}
              image={event.image}
              pub={event.public}
              setEvents={setEvents}
            />
          )})}
          
        </div>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add new Event</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add an event, please enter the following information:
              <h4 className={styles.error}>{`\n${error}`}</h4>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={onNameChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              onChange={onDescriptionChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Contact Email"
              type="email"
              fullWidth
              variant="standard"
              onChange={onEmailChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="price"
              label="Price"
              type="number"
              fullWidth
              variant="standard"
              onChange={onPriceChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddEvent}>Add</Button>
          </DialogActions>
        </Dialog>
      </main>
    </>
  );
};

interface EventCardProps {
  key: string;
  id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  hostedBy: string;
  image: string;
  pub: boolean;
  setEvents: any;
}

const EventCard = ({
  key,
  id,
  name,
  description,
  price,
  location,
  hostedBy,
  image,
  pub,
  setEvents
}: EventCardProps) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventEmail, setEventEmail] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [eventLocation, setLocation] = useState("");
  const [eventImage, setImage] = useState("");
  const [eventPublic, setPublic] = useState(pub);

  useEffect(() => {
    const getEvents = async () => {
      const axiosEvents = await axios.get("/api/event");
      setEvents(axiosEvents.data);
    };
    getEvents();
  }, [open]);

  console.log(key)
  console.log(id)

  const handleEditEvent = async () => {
    try {
      const axiosEvent: any = await axios.put("/api/manager/updateevent", {
        id: id,
        name: eventName,
        description: eventDescription,
        hostedBy: eventEmail,
        price: eventPrice,
        location: eventLocation,
        image: eventImage,
      });
      handleClose();
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };

  const onNameChange = (a: any) => {
    setEventName(a.target.value);
  };

  const onDescriptionChange = (a: any) => {
    setEventDescription(a.target.value);
  };

  const onEmailChange = (a: any) => {
    setEventEmail(a.target.value);
  };

  const onPriceChange = (a: any) => {
    setEventPrice(a.target.value);
  };

  const onLocationChange = (a: any) => {
    setLocation(a.target.value);
  };

  const onImageChange = (a: any) => {
    setImage(a.target.value);
  };

  const onPublicChange = async (a: any) => {
    try {
      const axiosEvent: any = await axios.put("/api/manager/updateevent", {
        id: id,
        public: !eventPublic,
      });
      handleClose();
      setPublic(!eventPublic);
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(key)
  return (
    <>
      <div key={id} className={styles.eventCard}>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>{hostedBy}</p>
        <p>{price}</p>
        <Button onClick={handleClickOpen} >Edit</Button>
        {eventPublic ? <Button onClick={onPublicChange} >Public</Button> : <Button onClick={onPublicChange} >Private</Button>}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change information, please edit the following information:
            <h4 className={styles.error}>{`\n${error}`}</h4>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            placeholder={name}
            onChange={onNameChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            placeholder={description}
            onChange={onDescriptionChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Contact Email"
            type="email"
            fullWidth
            variant="standard"
            placeholder={hostedBy}
            onChange={onEmailChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            placeholder={`${price}`}
            onChange={onPriceChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="location"
            label="Location"
            type="text"
            fullWidth
            variant="standard"
            placeholder={location}
            onChange={onLocationChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="image"
            label="Image"
            type="text"
            fullWidth
            variant="standard"
            placeholder={image}
            onChange={onImageChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditEvent}>Edit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageEvents;
