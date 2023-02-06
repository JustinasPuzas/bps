import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import QRCode from "react-qr-code";
import styles from "./TicketScreen.module.css";


interface TicketScreenProps {
    id: string;
    image: string;
    name: string;
    price: number;
    ticket: any;
    handleClose(): void;
  }
  
  const TicketScreen = ({
    id,
    image,
    name,
    price,
    ticket,
    handleClose,
  }: TicketScreenProps) => {
    if(!ticket) return null;
  
    return (
      <div className={styles.ticketBackground}>
        <DialogTitle>Ticket</DialogTitle>
        <DialogContent>
          <div className={styles.purchaseDetails}>
            <p>Name: {name}</p>
            <p>Price: {price} Eur</p>
          </div>
          <div className={styles.cardDetails}>
            <QRCode
              size={256}
              style={{ height: "100%", maxWidth: "auto", width: "100%" }}
              value={`${ticket.link}`}
              viewBox={`0 0 256 256`}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </div>
    );
  };

  export default TicketScreen;