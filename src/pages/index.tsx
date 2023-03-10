import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
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
          <MainPage events={(props as any).events} minValue={(props as any).minValue} maxValue={(props as any).maxValue} />
        </div>
      </main>
      <DiscoverBar events={(props as any).events} />
    </>
  );
};

interface MainPageProps {
  events: any[];
  minValue: number;
  maxValue: number;
}

const MainPage = ({ events, minValue, maxValue }: MainPageProps) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState<number[]>([minValue, maxValue]);
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
            min={minValue}
            max={maxValue}
            getAriaLabel={() => "Price range"}
            value={value}
            defaultValue={value}
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
export async function getServerSideProps() {
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
    },
    where: {
      public: true,
    },
  });

  const maxValue = await prisma.event.findMany({
    select: {
      price: true,
    },
    orderBy: {
      price: "desc",
    },
    take: 1,
  });

  const minValue = await prisma.event.findMany({
    select: {
      price: true,
    },
    orderBy: {
      price: "asc",
    },
    take: 1,
  });

  return {
    props: {
      events,
      maxValue: maxValue[0]?.price,
      minValue: minValue[0]?.price,
    },
  };
}

export default Home;
