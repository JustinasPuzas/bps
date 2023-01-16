import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Slider from "@mui/material/Slider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import PaymentIcon from "@mui/icons-material/Payment";
import FormControl from "@mui/material/FormControl";

const Home: NextPage = () => {
  const { data: session } = useSession();

  console.log(session);
  return (
    <>
      <Head>
        <title>BPS</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          B<span className={styles.pinkSpan}>P</span>S
        </h1>
        <div className={styles.container}>
          <MainPage />
        </div>
      </main>
      <DiscoverBar />
    </>
  );
};

const MainPage = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState<number[]>([20, 37]);
  const [min, setMin] = useState(100);
  const [max, setMax] = useState(0);

  const [eventList, setEventList] = useState([]);

  const handleOnSearch = async () => {
    const axiosUser = await axios.post("/api/event/filter", {
      search: name,
      price1: value[0],
      price2: value[1],
    });
    setEventList(axiosUser.data);
  };

  const handleOnNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  function valuetext(value: number) {
    return `${value} Eur`;
  }

  useEffect(() => {
    const getEventList = async () => {
      const axiosUser = await axios.get("/api/event");
      setEventList(axiosUser.data);
    };
    getEventList();
  }, []);

  return (
    <div className={styles.mainPage}>
      <div className={styles.searchBar}>
        <TextField
          onChange={handleOnNameChange}
          id="outlined-basic"
          label="Search"
          variant="outlined"
        />
        <div className={styles.priceContainer}>
          Price: From {value[0]} Eur to {value[1]} Eur
          <Slider
            min={min}
            max={max}
            getAriaLabel={() => "Price range"}
            value={value}
            defaultValue={[min, max]}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </div>
        <Button
          onClick={handleOnSearch}
          variant="outlined"
          endIcon={<SearchIcon />}
        >
          Search
        </Button>
      </div>
      <div className={styles.list}>
        {eventList.map((event: any) => {
          console.log(event);

          if (event.price < min) setMin(event.price);
          if (event.price > max) setMax(event.price);
          return (
            <EventCard
              key={event.id}
              id={event.id}
              image={event.image}
              name={event.name}
              price={event.price}
              description={event.description}
            />
          );
        })}
      </div>
    </div>
  );
};

const DiscoverBar = () => {
  const [events, setEvents] = useState([] as any[]);

  useEffect(() => {
    const getEventList = async () => {
      const axiosEvents = await axios.get("/api/event");
      const newArr: any[] = [...axiosEvents.data].sort(function () {
        return Math.random() - 0.5;
      });
      setEvents([
        newArr[0],
        newArr[newArr.length - 1],
        newArr[Math.floor(newArr.length / 2)],
      ]);
    };
    getEventList();
  }, []);

  return (
    <div className={styles.discoverBar}>
      <h2>DISCOVER</h2>
      {events.map((event: any) => {

        return (
          <DiscoverCard
            key={event.id}
            id={event.id}
            description={event.description}
            image={event.image}
            name={event.name}
            price={event.price}
          />
        );
      })}
    </div>
  );
};

interface EventCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  description: string;
}

const EventCard = ({ id, image, name, price, description }: EventCardProps) => {
  const [openDetails, setOpenDetails] = useState(false);

  const handleClose = () => {
    setOpenDetails(false);
  };

  return (
    <>
      <div className={styles.eventCard}>
        <img
          onClick={() => {
            setOpenDetails(true);
          }}
          className={styles.image}
          src={image}
        ></img>
        <h3>{name}</h3>
        <p>{price} Eur</p>
      </div>
      <DetailsCard
        id={id}
        image={image}
        name={name}
        price={price}
        description={description}
        handleClose={handleClose}
        openDetails={openDetails}
      />
    </>
  );
};

interface DiscoverCardProps {
  id: string
  image: string;
  name: string;
  price: number;
  description: string;
}

const DiscoverCard = ({
  id,
  image,
  name,
  description,
  price,
}: DiscoverCardProps) => {
  const [openDetails, setOpenDetails] = useState(false);

  const handleClose = () => {
    setOpenDetails(false);
  };

  return (
    <>
      <div
        className={styles.discoverCard}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div onClick={() => setOpenDetails(true)} className={styles.discoverText}>
          <h2>{name}</h2>
          <p>{price} Eur</p>
        </div>
      </div>
      <DetailsCard
        id={id}
        image={image}
        name={name}
        price={price}
        description={description}
        handleClose={handleClose}
        openDetails={openDetails}
      />
    </>
  );
};

interface DetailsCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  description: string;
  handleClose(): void;
  openDetails: boolean;
}

const DetailsCard = ({
  id,
  image,
  name,
  price,
  description,
  handleClose,
  openDetails,
}: DetailsCardProps) => {
  const [screen, setScreen] = useState(false);

  const handleScreen = () => {
    setScreen(!screen);

  };

  useEffect(() => {
    setTimeout(() => {
      setScreen(false);
      }, 500);
  }, [openDetails]);

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          backgroundImage: `url(${image})`,
          backdropFilter: "blur(10px)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
        },
      }}
      open={openDetails}
      onClose={handleClose}
    >
      <div className={styles.descriptionCard}>
        {!screen ? (
          <DescriptionScreen
            image={image}
            name={name}
            price={price}
            description={description}
            handleClose={handleClose}
            handleScreen={handleScreen}
          />
        ) : (
          <PurchaseScreen
            id={id}
            image={image}
            name={name}
            price={price}
            handleClose={handleClose}
            handleScreen={handleScreen}
          />
        )}
      </div>
    </Dialog>
  );
};

interface DescriptionScreenProps {
  image: string;
  name: string;
  price: number;
  description: string;
  handleClose(): void;
  handleScreen(): void;
}

const DescriptionScreen = ({
  image,
  name,
  price,
  description,
  handleClose,
  handleScreen,
}: DescriptionScreenProps) => {
  return (
    <div className={styles.descriptionBackground}>
      <div>
        <DialogTitle>{name}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "white" }}>
            <p>{description}</p>
            <p>Price: {price} Eur</p>
          </DialogContentText>
        </DialogContent>
      </div>
      <DialogActions
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Button color="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          size="large"
          startIcon={<PaymentIcon fontSize="large" />}
          color="secondary"
          variant="contained"
          onClick={handleScreen}
        >
          Purchase
        </Button>
      </DialogActions>
    </div>
  );
};

interface PurchaseScreenProps {
  id: string;
  image: string;
  name: string;
  price: number;
  handleClose(): void;
  handleScreen(): void;
}

const PurchaseScreen = ({
  id,
  image,
  name,
  price,
  handleClose,
  handleScreen,
}: PurchaseScreenProps) => {
  const [cardName, setCardName] = useState("");
  const [cardSurname, setCardSurname] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [error, setError] = useState("");

  const handlePurchase = async () => {
    try {
      await axios.put("/api/event/purchase", {
        eventId: id,
        name: cardName,
        surname: cardSurname,
        cardNumber: cardNumber,
        cardCvc: cardCvv,
        cardExpiry: cardExpiration,
      });
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };

  const handleCardName = (e: any) => {
    setCardName(e.target.value);
  };

  const handleCardSurname = (e: any) => {
    setCardSurname(e.target.value);
  };

  const handleCardNumber = (e: any) => {
    setCardNumber(e.target.value);
  };

  const handleCardCvv = (e: any) => {
    setCardCvv(e.target.value);
  };

  const handleCardExpiration = (e: any) => {
    setCardExpiration(e.target.value);
  };

  return (
    <div className={styles.purchaseBackground}>
      <DialogTitle>Payment</DialogTitle>
      <DialogContent>
        <div className={styles.purchaseDetails}>
          {name}
          {price}
          <p className={styles.error}>{error}</p>
        </div>
        <div className={styles.cardDetails}>
          <div className={styles.cardHolderName}>
            <TextField onChange={handleCardName} required label="Name" />
            <TextField onChange={handleCardSurname} required label="Surname" />
          </div>
          <TextField
            onChange={handleCardNumber}
            required
            fullWidth
            label="Card Number"
            type="number"
          />
          <div className={styles.cardInfo}>
            <TextField
              onChange={handleCardCvv}
              required
              label="CVV"
              type="number"
            />
            <TextField
              onChange={handleCardExpiration}
              required
              label="Expiration date"
              type="month"
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleScreen}>Back</Button>
        <Button onClick={handlePurchase}>Buy</Button>
      </DialogActions>
    </div>
  );
};

export default Home;
