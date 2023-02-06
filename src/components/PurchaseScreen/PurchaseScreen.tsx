import React, { useState } from "react";
import axios from "axios";
import styles from "./PurchaseScreen.module.css";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface PurchaseScreenProps {
  id: string;
  image: string;
  name: string;
  price: number;
  handleClose(): void;
  handleScreen(): void;
  setTicket: any;
  setScreen: any;
}

const PurchaseScreen = ({
  id,
  image,
  name,
  price,
  handleClose,
  handleScreen,
  setTicket,
  setScreen,
}: PurchaseScreenProps) => {
  const [cardName, setCardName] = useState("");
  const [cardSurname, setCardSurname] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [error, setError] = useState("");
  const handlePurchase = async () => {
    try {
      const res = await axios.put("/api/event/purchase", {
        eventId: id,
        name: cardName,
        surname: cardSurname,
        cardNumber: cardNumber,
        cardCvc: cardCvv,
        cardExpiry: cardExpiration,
      });
      setTicket(res.data);
      setScreen(2);
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
          <p>Name: {name}</p>
          <p>Price: {price} Eur</p>
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
        <Button onClick={() => setScreen(0)}>Back</Button>
        <Button onClick={handlePurchase}>Buy</Button>
      </DialogActions>
    </div>
  );
};

export default PurchaseScreen;
