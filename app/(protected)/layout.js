"use client"
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import styles from "../styles/protected.module.css"
import { AuthContext } from '@/context/AuthContext'
import { HabitProvider } from '@/context/HabitContext'
import { useRouter, usePathname } from 'next/navigation'
import ClientLoading from '../component/ClientLoading'
import { SquaresFour, Users, GearSix, User, SignOut, House, ChartPie, Bell, List   } from 'phosphor-react'

export default function ProtectedLayout({children}) {
  const {authUser, loading, logout} = useContext(AuthContext)
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    if (!authUser.status && !loading) {
      router.push("/login")
    }
  }, [authUser])

  // mobile nav toggle
  const [navVisible, setNavVisible] = useState(false)

  return (
    <HabitProvider>
      <div className={styles.protected_layout}>
        <div className={styles.protected_floating_tool}>
          <button 
            className={`${styles.hamburger_menu_btn} ${navVisible && `${styles.visible}`}`}
            onClick={() => setNavVisible(!navVisible)}
          >
            <List/>
          </button>
          <div className={styles.floating_user_tools}>
            <Bell/>
            <p>{authUser.username}</p>
          </div>
        </div>
        <aside className={`${styles.protected_aside} ${navVisible ? `${styles.visible}` : `${styles.invisible}`}`}>
          <div className={styles.logo_wrap}>
            <img className={styles.logo_img} src="/navigation.png" alt="arrow_logo"/>
            <p className={`${styles.logo_text} ${styles.full_width}`}>Forward</p>
          </div>
          
          <nav className={styles.navbar}>
            <Link href="/" className={pathname === "/" ? `${styles.active}` : ""}>
              <SquaresFour/>
              <span className={styles.full_width}>Dashboard</span>
            </Link>
            <Link href="friends" className={pathname === "/friends" ? `${styles.active}` : ""}>
              <Users/>
              <span className={styles.full_width}>Friends</span>
            </Link>
            <Link href="/analytics" className={pathname === "/analytics" ? `${styles.active}` : ""}>
              <ChartPie/>
              <span className={styles.full_width}>Analytics</span>
            </Link>
            <Link href={`/profile/${authUser.id}`} className={pathname === `/profile/${authUser.id}` ? `${styles.active}` : ""}>
              <User/>
              <span className={styles.full_width}>Profile</span>
            </Link>
            <Link href="/settings" className={pathname === "/settings" ? `${styles.active}` : ""}>
              <GearSix/>
              <span className={styles.full_width}>Settings</span>
            </Link>
          </nav>
          <button className={styles.sign_out_btn} onClick={logout}>
            <SignOut/>
            <span className={styles.full_width}>Sign Out</span>
          </button>
        </aside>
        <main className={styles.protected_layout_outlet}>
          {loading ? <ClientLoading/> : children}
        </main>
      </div>
    </HabitProvider>
  )
}
