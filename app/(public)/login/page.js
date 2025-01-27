"use client"

import React from 'react'
import LoginRegForm from '@/app/component/LoginRegForm'
import styles from "../../styles/logreg.module.css"

export default function LoginPage () {
  return (
    <div className={styles.logreg_page}>
        <LoginRegForm type="login"/>
      
    </div>
  )
}

