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

  return (
    <>
      <Link
        href={link}
        onClick={onClick}
        className={router.pathname === link ? `${style.isActive} ${style.sideitem}` : style.sideitem}
      >
        <Icon className={style.icon} />
        <span>{Name}</span>
      </Link>
    </>
  );
}

export default SideItem;
