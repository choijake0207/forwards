"use client"
import React from 'react'
import styles from "../../styles/logreg.module.css"
import LoginRegForm from '@/app/component/LoginRegForm'

export default function RegisterPage () {
  return (
    <div className={styles.logreg_page}>
        <LoginRegForm/>
    </div>
  )
}

