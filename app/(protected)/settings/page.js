"use client"
import React, {useEffect, useState} from 'react'
import styles from "../../styles/settings.module.css"
import { fetchUserAPI } from '@/app/api/protected/user/UserCalls'
import { changePasswordAPI } from '@/app/api/protected/user/UserCalls'
import {format} from "date-fns"
import ClientLoading from '@/app/component/ClientLoading'
import Alert from "@/app/component/Alert"

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState()
  const [edit, setEdit] = useState(false)
  const [alert, setAlert] = useState(null)
  const [passwordForm, setPasswordForm] = useState({
    old: "",
    new: ""
  })

  const triggerAlert = (message, type) => {
    setAlert({message, type})
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchUserAPI()
        setUser(response.user)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await changePasswordAPI(passwordForm.old, passwordForm.new)
      triggerAlert("Password Reset", "Success")
      setPasswordForm({old: "", new: ""})
      setEdit(false)
    } catch (error) {
      triggerAlert(error.message, "Failure")
      console.error(error)
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setPasswordForm({old: "", new: ""})
    setEdit(false)
  }


  return (
    <div className={`${styles.settings_page} page`}>
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)}/>}
      <h1>Settings</h1>
      {loading ?
        <ClientLoading/> 
      : 
        <div className={styles.settings_fields_container}>

            <div className={styles.first_name}>
              <label>First Name</label>
              <p>{user.firstName}</p>
            </div>
            <div className={styles.last_name}>
              <label>Last Name</label>
              <p>{user.lastName}</p>
            </div>

          <div className={styles.username}>
            <label>Username</label>
            <p>{user.username}</p>
          </div>

          <div className={`${styles.password} ${edit === true ? `${styles.edit_mode}` : ""}`}>
            <label>Password</label>
            {
              edit ?
                <form className={styles.password_form} onSubmit={handleSubmit}>
                  <label>Old Password
                    <span className={`
                      ${styles.mobile_error}
                      ${alert && alert.message === "Incorrect Old Password" ? styles.active_error : ""}
                    `}>
                      Password Incorrect
                    </span>
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordForm.old}
                    onChange={(e) => setPasswordForm({...passwordForm, old: e.target.value})}
                  />
                  <label>New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.new}
                    onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
                  />
                  <div className={styles.btn_container}>
                    <button onClick={handleCancel} className={styles.form_cancel_btn}>Cancel</button>
                    <button className={styles.form_submit_btn}>Change</button>
                  </div>
                </form>
              : 
                <button className={styles.form_toggle_btn} onClick={() => setEdit(true)}>Change Password</button>
            }
          </div>
          <div className={styles.created}>
            <label>User Since</label>
            <p>{format(new Date(user.createdAt), "M-d-yyyy")}</p>
          </div>


        </div>
      }
    </div>
  )
}
