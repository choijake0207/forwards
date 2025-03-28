"use client"
import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '@/context/AuthContext'
import styles from "../../styles/landing.module.css"
import { useRouter } from 'next/navigation'


export default function Header() {
    const {authUser, loading} = useContext(AuthContext)
    const router = useRouter()





  return (
      <header className={styles.landing_header}>
            <div className={styles.logo_container}>
                <img src="./navigation.png" className={styles.logo} alt="logo"/>
                <p className={styles.logo_title}>Forward</p>
            </div>
            <div className={styles.user_portal_links} style={{visibility: loading  ? "hidden" : "visible"}}>
                {authUser.status ? 
                    <button className={styles.user_portal} onClick={() =>router.push("/")}>
                        User Portal
                    </button>

                    :

                    <>
                        <button className={styles.sign_up_btn} onClick={() => router.push("/register")}>Join Today</button>
                        <button className={styles.login_btn} onClick={() => router.push("/login")}>Login</button>
                    </>
                   
                }
            </div>
    </header>
  )
}
