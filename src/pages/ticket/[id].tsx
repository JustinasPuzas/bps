import styles from "./[id].module.css";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import QRCode from "react-qr-code";

const Page: NextPage = () => {
  const router = useRouter();
  const placeHolder = {id: "", name: "", price: "", link: "",
  event: { name: "", description: "", price: ""}
}
  const [ticket, setTicket] = useState(placeHolder);
  const { id } = router.query;
  console.log(id)

  useEffect(() => {
    const getTicket = async () => {
      if(id){
        const axiosTicket = await axios.get(`/api/event/ticket?id=${id}`);
        setTicket(axiosTicket.data);
        console.log(axiosTicket.data)
      }
    };
    getTicket();
  }, [id]);

  return (
    <>
      <Head>
        <title>BPS Ticket</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>{ticket.event.name}</h1>
          <p>Description: {ticket.event.description}</p>
          <p>Price: {ticket.event.price} Eur</p>
          <QRCode
            size={256}
            style={{ height: "400px", maxWidth: "auto", width: "400px" }}
            value={`${ticket?.link}`}
            viewBox={`0 0 256 256`}
          />
        </div>
      </main>
    </>
  );
};

export default Page;