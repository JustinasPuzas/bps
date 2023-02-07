import React, {useState} from "react";
import DetailsCard from "../DetailsCard/DetailsCard";
import styles from "./EventCard.module.css";
import Image from "next/image";

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
          <Image
            onClick={() => {
              setOpenDetails(true);
            }}
            className={styles.image}
            src={image}
            alt={name}
            width={300}
            height={200}
          ></Image>
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

  export default EventCard;