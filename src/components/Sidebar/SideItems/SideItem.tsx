import React, { useState } from "react";
import style from "./SideItem.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  Icon: any;
  Name?: string;
  link: string;
  close?: boolean;
  onClick?: () => void;
}

function SideItem({ Icon, Name, link, close, onClick }: Props) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(router.pathname === link);

  return (
    <>
      <Link
        href={link}
        onClick={onClick}
        style={{
          background: isActive ? "var(--five-color)" : "",
          color: isActive ? "#fff" : "gray",
          borderLeft: isActive ? "1px solid var(--second-color)" : "",
        }}
        className={router.pathname === link ? `${style.isActive} ${style.sideitem}` : style.sideitem}
      >
        <Icon className={style.icon} />
        <span>{Name}</span>
      </Link>
    </>
  );
}

export default SideItem;
