import Link from 'next/link'
import React from 'react'
import styles from "../styles/protected.module.css"

export default function ProtectedLayout({children}) {
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
