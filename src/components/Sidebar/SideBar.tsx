import styles from "./Sidebar.module.css";
import { useState } from "react";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SideItem from "./SideItems/SideItem";
import { useSession, signIn, signOut } from "next-auth/react";
import EventIcon from "@mui/icons-material/Event";
import Link from "next/link";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const SideBar = () => {
  const [show, setShow] = useState(false);
  const { data: session } = useSession();
  return (
    <>
      <div
        className={
          show ? `${styles.sidebar} ${styles.side__show}` : styles.sidebar
        }
      >
        {" "}
        <div className={styles.logo}>
          <img
            src="https://images.vexels.com/media/users/3/229320/isolated/preview/3dbf158d77c22e31cee5eafbdcf5ce0f-square-gradient-logo.png"
            alt="logo"
          />
          <h3>BPS</h3>
        </div>
        <div className={styles.side_box}>
          <div className={styles.box_one}>
            <span className={styles.heading}>Menu</span>
            <SideItem Icon={TheaterComedyIcon} Name="Home" link="/" />

            {session?.user?.admin ? (
              <>
                <SideItem Icon={EventIcon} Name="Events" link="/manageEvents" />
                <SideItem
                  Icon={QueryStatsIcon}
                  Name="Statistics"
                  link="/statistics"
                />
              </>
            ) : null}
            <LoginButton />
          </div>
        </div>
      </div>
      <div
        className={show ? `${styles.layer} ${styles.layer__show}` : styles.layer}
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
        <Link href="/profile" className={styles.sideitem}>
          {session?.user?.image ? (
            <img src={session.user.image} className={styles.avatar} />
          ) : (
            <AccountCircleIcon className={styles.icon} />
          )}

          {session?.user?.name}
        </Link>
      ) : (
        <SideItem
          Icon={AccountCircleIcon}
          Name="Sign In"
          onClick={() => signIn()}
          link={""}
        />
      )}
    </>
  );
};

export default SideBar;
