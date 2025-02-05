"use client"
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import styles from "../styles/protected.module.css"
import { AuthContext } from '@/context/AuthContext'
import { HabitProvider } from '@/context/HabitContext'
import { useRouter, usePathname } from 'next/navigation'
import ClientLoading from '../component/ClientLoading'
import { SquaresFour, Users, GearSix, User, SignOut, House, ChartPie, Bell   } from 'phosphor-react'

export default function ProtectedLayout({children}) {
  const {authUser, loading, logout} = useContext(AuthContext)
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    if (!authUser.status && !loading) {
      router.push("/login")
    }
  }, [authUser])


  return (
    <HabitProvider>
      <div className={styles.protected_layout}>
        <div className={styles.protected_floating_tool}>
          <Bell/>
          <p>{authUser.username}</p>
        </div>
        <aside className={styles.protected_aside}>
          <div className={styles.logo_wrap}>
            <img className={styles.logo_img} src="/navigation.png" alt="arrow_logo"/>
            <p className={styles.logo_text}>Forward</p>
          </div>
          
          <nav className={styles.navbar}>
            <Link href="/" className={pathname === "/" ? `${styles.active}` : ""}><SquaresFour/>Dashboard</Link>
            <Link href="friends" className={pathname === "/friends" ? `${styles.active}` : ""}><Users/>Friends</Link>
            <Link href="/analytics" className={pathname === "/analytics" ? `${styles.active}` : ""}><ChartPie/>Analytics</Link>
            <Link href={`/profile/${authUser.id}`} className={pathname === `/profile/${authUser.id}` ? `${styles.active}` : ""}><User/>Profile</Link>
            <Link href="/settings" className={pathname === "/settings" ? `${styles.active}` : ""}><GearSix/>Settings</Link>
          </nav>
          <button className={styles.sign_out_btn} onClick={logout}>
            <SignOut/>
            Sign Out
          </button>
        </aside>
        <main className={styles.protected_layout_outlet}>
          {loading ? <ClientLoading/> : children}
        </main>
      </div>
    </HabitProvider>
  )
}
