import React, {useEffect} from 'react'
import styles from "../styles/alert.module.css"

const Alert = ({message, type, onClose}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
          document.getElementById("alert_box").classList.add(styles.slide_out)
          setTimeout(() => {
            onClose()
          }, 1000)
        }, 2000);
        return () => clearTimeout(timer)
    }, [])
  return (
    <div className={`${styles.alert_box} ${styles[type]}`} id="alert_box">
          <button 
            className={styles.alert_box_close_btn}
            onClick={onClose}
        >
            X
        </button>
        <p className={styles.alert_box_msg}>{message}</p>
    
    </div>
  )
}

export default Alert
