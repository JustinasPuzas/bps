import React from "react";
import style from "./SideItem.module.css";
import { useRouter } from 'next/router'
import Link from "next/link";

interface Props {
  Icon: any;
  Name?: string;
  link: string;
  close?: boolean;
  onClick?: () => void;
}


function SideItem({ Icon , Name, link , close, onClick  }: Props) {
  const router = useRouter()

  const buttonHandler = () => {
    console.log(router.pathname)
    const isActive = router.pathname === link;
    return {
      background: isActive ? "var(--five-color)" : "",
      color: isActive ? "#fff" : "gray",
      borderLeft: isActive ? "1px solid var(--second-color)" : "",
    };
  };

  return (
    <>
        <Link href={link} onClick={onClick} style={buttonHandler()} className={close ? `${style.close} ${style.sideitem}` : style.sideitem}>
          <Icon className={style.icon} />
          <span>{Name}</span>
        </Link>
   
    </>
  );
}

export default SideItem;
