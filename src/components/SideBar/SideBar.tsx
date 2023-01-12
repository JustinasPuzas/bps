import style from "../../styles/SideBar.module.css";
import { useState } from "react";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SideItem from "./SideItems/SideItem";
import { useSession, signIn, signOut } from "next-auth/react";
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from '@mui/icons-material/Event';

const SideBar = () => {
  const [show, setShow] = useState(false);
  const { data: session } = useSession();
  return (
    <>
      <div
        className={
          show ? `${style.sidebar} ${style.side__show}` : style.sidebar
        }
      >
        {" "}
        <div className={style.logo}>
          <img
            src="https://images.vexels.com/media/users/3/229320/isolated/preview/3dbf158d77c22e31cee5eafbdcf5ce0f-square-gradient-logo.png"
            alt="logo"
          />
          <h3>BPS</h3>
        </div>
        <div className={style.side_box}>
          <div className={style.box_one}>
            <span className={style.heading}>Menu</span>
            <SideItem Icon={TheaterComedyIcon} Name="Home" link="/" />
            <SideItem Icon={SearchIcon} Name="Search" link="/search" />
            <SideItem
              Icon={ConfirmationNumberIcon}
              Name="My Tickets"
              link="/myTickets"
            />
            {session?.user?.admin ? <SideItem Icon={EventIcon} Name="Events" link="/manageEvents" /> : null}
            <LoginButton />
          </div>
        </div>
      </div>
      <div
        className={show ? `${style.layer} ${style.layer__show}` : style.layer}
        onClick={() => setShow(false)}
      ></div>
    </>
  );
};

const LoginButton = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <a href="/profile" className={style.sideitem} >
          {session?.user?.image? <img src={session.user.image} className={style.avatar} /> : <AccountCircleIcon className={style.icon}/>}
          
          {session?.user?.name}
          </a>
      ) : (
        <SideItem
          Icon={AccountCircleIcon}
          Name="Sign In"
          link={"http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F"}
        />
      )}
    </>
  );
};

export default SideBar;