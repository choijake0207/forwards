"use client"
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import styles from "../styles/protected.module.css"
import { AuthContext } from '@/context/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import ClientLoading from '../component/ClientLoading'
import { SquaresFour, Users, GearSix, User, SignOut, House, ChartPie   } from 'phosphor-react'

export default function ProtectedLayout({children}) {
  const {authUser, loading} = useContext(AuthContext)
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    if (!authUser.status && !loading) {
      router.push("/login")
    }
  }, [authUser])


  return (
    <div className={styles.protected_layout}>
      <aside className={styles.protected_aside}>
        <nav className={styles.navbar}>
          <Link href="/" className={pathname === "/" ? "active" : ""}><House/>Dashboard</Link>
          <Link href="myhabits" className={pathname === "/myhabits" ? "active" : ""}><SquaresFour/>My Habits</Link>
          <Link href="friends" className={pathname === "/friends" ? "active" : ""}><Users/>Friends</Link>
          <Link href="/analytics" className={pathname === "/analytics" ? "active" : ""}><ChartPie/>Analytics</Link>
          <Link href="/profile" className={pathname === "/profile" ? "active" : ""}><User/>Profile</Link>
          <Link href="/settings" className={pathname === "/settings" ? "active" : ""}><GearSix/>Settings</Link>
        </nav>
      </aside>
      <main className="protected-layout-outlets">
        {loading ? <ClientLoading/> : children}

      </main>
    </div>
  )
}
