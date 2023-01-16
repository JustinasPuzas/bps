import styles from "./profile.module.css";
import { NextPage } from "next";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const Profile: NextPage = () => {
  const { data: session, status } = useSession();

  // Render
  if (status === "loading")
    return (
      <main className={styles.main}>
        <div className={styles.container}> Loading... </div>
      </main>
    );
  if (status === "unauthenticated") signIn();

  return (
    <>
      <Head>
        <title>BPS Profile</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.cardRow}></div>
      </main>
    </>
  );
};

export default Profile;
