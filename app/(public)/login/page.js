"use client"

import React from 'react'
import LoginRegForm from '@/app/component/LoginRegForm'
import styles from "../../styles/logreg.module.css"

export default function LoginPage () {
  return (
    <div className={styles.logreg_page}>
        <h1 className={styles.logreg_header}>Sign In</h1>
        <LoginRegForm type="login"/>
      
    </div>
  )
}

