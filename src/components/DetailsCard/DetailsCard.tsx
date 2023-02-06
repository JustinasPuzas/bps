import Dialog from "@mui/material/Dialog";
import React, {useState, useEffect} from "react";
import DescriptionScreen from "../DescriptionScreen/DescriptionScreen";
import PurchaseScreen from "../PurchaseScreen/PurchaseScreen";
import TicketScreen from "../TicketScreen/TicketScreen";
import styles from "./DetailsCard.module.css";



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
    const [screen, setScreen] = useState(0);
    const [ticket, setTicket] = useState({});
  
    const handleScreen = () => {
      setScreen(screen - 1);
    };
  
    useEffect(() => {
      setTimeout(() => {
        setScreen(0);
      }, 500);
    }, [openDetails]);
  
    const PageTurner = () => {
      if (screen == 0) {
        return (
          <DescriptionScreen
            image={image}
            name={name}
            price={price}
            description={description}
            handleClose={handleClose}
            handleScreen={handleScreen}
            setScreen={setScreen}
          />
        );
      } else if (screen == 1) {
        return (
          <PurchaseScreen
            setTicket={setTicket}
            id={id}
            image={image}
            name={name}
            price={price}
            handleClose={handleClose}
            handleScreen={handleScreen}
            setScreen={setScreen}
          />
        );
      } else if (screen == 2) {
        return (
          <TicketScreen
            id={id}
            ticket={ticket}
            image={image}
            name={name}
            price={price}
            handleClose={handleClose}
          />
        );
      } else {
        setScreen(0);
        return <div>error</div>;
      }
    };
  
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
        <div className={styles.descriptionCard}>{PageTurner()}</div>
      </Dialog>
    );
  };

    export default DetailsCard;