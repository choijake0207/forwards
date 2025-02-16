import React from 'react'
import styles from "../styles/loader.module.css"
import {ring2} from 'ldrs'

const ClientLoading = ({type}) => {
  ring2.register()
  return (
    <div className={`${styles.client_loader} ${styles[type]}`}>
        <l-ring-2 size="40" stroke="4" color={"rgb(52, 114, 231)"}></l-ring-2>
    </div>
  )
}

export default ClientLoading
