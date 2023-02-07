import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./DiscoverBar.module.css";
import DetailsCard from "../DetailsCard/DetailsCard";

interface DiscoverBarProps {
  events: any[];
}

const DiscoverBar = ({ events }: DiscoverBarProps) => {
  const [randomEvents, setRandomEvents] = useState<any[]>([]);

  useEffect(() => {
    const newArr: any[] = [...events].sort(function () {
        return Math.random() - 0.5;
      });
    
      setRandomEvents([
        newArr[0],
        newArr[newArr.length - 1],
        newArr[Math.floor(newArr.length / 2)],
      ]);
  }, []);

  return (
    <div className={styles.discoverBar}>
      <h2>DISCOVER</h2>
      {randomEvents.map((event: any) => {
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

interface DiscoverCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  description: string;
}

export const DiscoverCard = ({
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
        <div
          onClick={() => setOpenDetails(true)}
          className={styles.discoverText}
        >
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

export default DiscoverBar;
