import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Slider from "@mui/material/Slider";
import DiscoverBar from "../components/DiscoverBar/DiscoverBar";
import EventCard from "../components/EventCard/EventCard";

import { prisma } from "../server/db";

const Home: NextPage = (props) => {

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
          <MainPage events={(props as any).events}/>
        </div>
      </main>
      <DiscoverBar events={(props as any ).randomEvents} />
    </>
  );
};

interface MainPageProps {
  events: any[];
}
const MainPage = ({events}: MainPageProps) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState<number[]>([20, 37]);
  const [min, setMin] = useState(100);
  const [max, setMax] = useState(0);
  const [eventList, setEventList] = useState(events);

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

// server side rendering
export async function getStaticProps(context: any) {

  const events = await prisma.event.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      hostedBy: true,
      image: true,
      date: true,
      price: true,
      public: true,
      location: true,
    },
    where: {
      public: true,
    }
  });

  const newArr: any[] = [...events].sort(function () {
    return Math.random() - 0.5;
  });

  const randomEvents = [
    newArr[0],
    newArr[newArr.length - 1],
    newArr[Math.floor(newArr.length / 2)],
  ];

  return {
    props: {
      events,
      randomEvents,
    },
  }
}

export default Home;
