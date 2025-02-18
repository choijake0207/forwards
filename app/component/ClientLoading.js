"use client"
import React from 'react'
import styles from "../styles/loader.module.css"


const ClientLoading = ({type}) => {

  return (
    <div className={`${styles.client_loader} ${styles[type]}`}>
      <div className={styles.loader_circle}>
        <div className={styles.loader_progress}></div>
      </div>
    </div>

  )
}

export default ClientLoading
