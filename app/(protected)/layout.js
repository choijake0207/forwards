"use client"
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import styles from "../styles/protected.module.css"
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import ClientLoading from '../component/ClientLoading'
import { SquaresFour, Users, GearSix, User, SignOut, House, ChartPie   } from 'phosphor-react'

export default function ProtectedLayout({children}) {
  const {authUser, loading} = useContext(AuthContext)
  const router = useRouter()
  useEffect(() => {
    if (!authUser.status && !loading) {
      router.push("/login")
    }
  }, [authUser])


  return (
    <div className={styles.protected_layout}>
      <aside className={styles.protected_aside}>
        <nav className={styles.navbar}>
          <Link href="/"><House/>Dashboard</Link>
          <Link href="myhabits"><SquaresFour/>My Habits</Link>
          <Link href="friends"><Users/>Friends</Link>
          <Link href="/analytics"><ChartPie/>Analytics</Link>
          <Link href="/profile"><User/>Profile</Link>
          <Link href="/settings"><GearSix/>Settings</Link>
        </nav>
      </aside>
      <main className="protected-layout-outlets">
        {loading ? <ClientLoading/> : children}

      </main>
    </div>
  )
}
