import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./DescriptionScreen.module.css";
import PaymentIcon from "@mui/icons-material/Payment";

interface DescriptionScreenProps {
    image: string;
    name: string;
    price: number;
    description: string;
    handleClose(): void;
    handleScreen(): void;
    setScreen: any;
  }
  
  const DescriptionScreen = ({
    image,
    name,
    price,
    description,
    handleClose,
    handleScreen,
    setScreen,
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
            onClick={() => setScreen(1)}
          >
            Purchase
          </Button>
        </DialogActions>
      </div>
    );
  };

  export default DescriptionScreen;