"use client"
import React, {useEffect, useState} from 'react'
import styles from "../../styles/settings.module.css"
import { fetchUserAPI } from '@/app/api/protected/user/UserCalls'
import { changePasswordAPI } from '@/app/api/protected/user/UserCalls'
import {format} from "date-fns"
import ClientLoading from '@/app/component/ClientLoading'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState()
  const [edit, setEdit] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    old: "",
    new: ""
  })


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
    } catch (error) {
      console.error(error)
    }
  }



  return (
    <div className={`${styles.settings_page} page`}>
      <h1>Account Settings</h1>
      {loading ?
        <ClientLoading/> 
      :
        <div className={styles.settings_fields_container}>

          <div className={styles.name_fields}>
            <div className={styles.first_name}>
              <label>First Name</label>
              <p>{user.firstName}</p>
            </div>
            <div className={styles.last_name}>
              <label>Last Name</label>
              <p>{user.lastName}</p>
            </div>
          </div>

          <div className={styles.username}>
            <label>Username</label>
            <p>{user.username}</p>
          </div>

          <div className={styles.password}>
            <label>Password</label>
            {
              edit ?
                <form className={styles.password_form} onSubmit={handleSubmit}>
                  <label>Old Password</label>
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
                  <button type="submit">Change</button>
                </form>
              : 
                <button onClick={() => setEdit(true)}>Change Password</button>
            }
          </div>

        </div>
      }
    </div>
  )
}
