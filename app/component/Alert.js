import React, {useEffect} from 'react'
import styles from "../styles/alert.module.css"

const Alert = ({message, type, onClose}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
          document.getElementById("alert-box").classList.add("slide-out")
          setTimeout(() => {
            onClose()
          }, 100)
        }, 2000);
        return () => clearTimeout(timer)
    }, [])
  return (
    <div className={`${styles.alert_box} ${styles[type]}`}>
        <p className={styles.alert_box_msg}>{message}</p>
        <button 
            className={styles.alert_box_close_btn}
            onClick={onClose}
        >
            X
        </button>
    </div>
  )
}

export default Alert
