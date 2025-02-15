"use client"
import Link from 'next/link'
import React, { useContext, useEffect, useState, useRef } from 'react'
import styles from "../styles/protected.module.css"
import { AuthContext } from '@/context/AuthContext'
import { HabitProvider } from '@/context/HabitContext'
import { useRouter, usePathname } from 'next/navigation'
import ClientLoading from '../component/ClientLoading'
import { ThemeContext } from '@/context/ThemeContext'
import { SquaresFour, Users, GearSix, User, SignOut, House, ChartPie, Bell, List   } from 'phosphor-react'

export default function ProtectedLayout({children}) {
  const {authUser, loading, logout} = useContext(AuthContext)
  const router = useRouter()
  const pathname = usePathname()
  const {darkMode, toggleMode} = useContext(ThemeContext)

  // floating tool modal toggle
  const [floatingToolModal, setFloatingToolModal] = useState(false)
  const modalRef = useRef(null)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && !e.target.closest(`.${styles.floating_user_tools}`)) {
        setFloatingToolModal(false)
      }
    }
      if (floatingToolModal) {
        document.addEventListener("mousedown", handleOutsideClick)
      } 

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick)
      }
    
  }, [floatingToolModal])
  // mobile nav toggle
  const [navVisible, setNavVisible] = useState(false)
  const mobileNavRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target) && !e.target.closest(`.${styles.hamburger_menu_btn}`)) {
        setNavVisible(false)
      }
    }
    if (navVisible) {
      document.addEventListener("mousedown", handleOutsideClick)
    } 

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [navVisible])




  useEffect(() => {
    if (!authUser.status && !loading) {
      router.push("/login")
    }
  }, [authUser])

  if (loading || (!authUser?.status && !loading)) {
    return null
  }



  return (
    <HabitProvider>
      <div className={`${styles.protected_layout} protected_layout ${darkMode ? "dark" : "light"}`}>
        <div className={styles.protected_floating_tool}>
          <button 
            className={`${styles.hamburger_menu_btn} ${navVisible && `${styles.visible}`}`}
            onClick={() => setNavVisible(!navVisible)}
          >
            <List/>
          </button>
          <div className={styles.floating_user_tools} onClick={() => setFloatingToolModal(true)}>
            {/* <Bell/> */}
            <p>{authUser.username}</p>
            {floatingToolModal && 
              <div className={styles.floating_tool_modal} ref={modalRef}>
                <button className={styles.modal_signout_btn} onClick={logout}>Sign Out</button>
              </div>
            }
          </div>
        </div>
        <aside className={`${styles.protected_aside} ${navVisible ? `${styles.visible}` : `${styles.invisible}`}`} ref={mobileNavRef}>
          <div className={styles.logo_wrap}>
            <img className={styles.logo_img} src="/navigation.png" alt="arrow_logo"/>
            <p className={`${styles.logo_text} ${styles.full_width}`}>Forward</p>
          </div>
          
          <nav className={styles.navbar} >
            <Link href="/" className={pathname === "/" ? `${styles.active}` : ""} onClick={() => navVisible && setNavVisible(false)}>
              <SquaresFour/>
              <span className={styles.full_width}>Dashboard</span>
            </Link>
            <Link href="/analytics" className={pathname === "/analytics" ? `${styles.active}` : ""} onClick={() => navVisible && setNavVisible(false)}>
              <ChartPie/>
              <span className={styles.full_width}>Analytics</span>
            </Link>
            {/* <Link href={`/profile/${authUser.id}`} className={pathname === `/profile/${authUser.id}` ? `${styles.active}` : ""}>
              <User/>
              <span className={styles.full_width}>Profile</span>
            </Link>
            <Link href="friends" className={pathname === "/friends" ? `${styles.active}` : ""}>
              <Users/>
              <span className={styles.full_width}>Friends</span>
            </Link> */}
            <a id={styles.wip_links}> <Users/>Friends <span>Coming Soon</span></a>
            <a id={styles.wip_links}><User/>Profile <span >Coming Soon</span></a>
            <Link href="/settings" className={pathname === "/settings" ? `${styles.active}` : ""} onClick={() => navVisible && setNavVisible(false)}>
              <GearSix/>
              <span className={styles.full_width}>Settings</span>
            </Link>
          </nav>
          <div className={styles.navbar_extra}>
            <button className={styles.sign_out_btn} onClick={logout}>
              <SignOut/>
              <span className={styles.full_width}>Sign Out</span>
            </button>
            {/* <button className={styles.theme_button} onClick={toggleMode}>
                Toggle Dark
            </button> */}
          </div>
      
        </aside>
        <main className={styles.protected_layout_outlet}>
          {loading ? <ClientLoading/> : children}
        </main>
      </div>
    </HabitProvider>
  )
}
