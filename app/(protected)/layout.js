"use client"
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import styles from "../styles/protected.module.css"
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import ClientLoading from '../component/ClientLoading'

export default function ProtectedLayout({children}) {
  const {authUser, loading} = useContext(AuthContext)
  const router = useRouter()
  useEffect(() => {
    if (!authUser.status && !loading) {
      router.push("/login")
    }
  }, [authUser])

  if (loading) {
    return (
      <ClientLoading/>
    )
  }

  return (
    <div className={styles.protected_layout}>
      <nav className={styles.navbar}>
        <Link href="/">Dashboard</Link>
        <Link href="myhabits">My Habits</Link>
        <Link href="friends">Friends</Link>
        <Link href="/analytics">Analytics</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/settings">Settings</Link>
      </nav>
      <main className="protected-layout-outlets">{children}</main>
    </div>
  )
}
