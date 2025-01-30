"use client"
import React, {useContext, useState} from 'react'
import { AuthContext } from '@/context/AuthContext'
import HabitForm from '../component/HabitForm'

const page = () => {
  const {authUser} = useContext(AuthContext)
  const [formVisible, setFormVisible] = useState(false)
  return (
    <div>
      <h1>Welcome To Dashboard {authUser.firstName}</h1>
      <button onClick={() => setFormVisible(!formVisible)}>Form</button>
      {formVisible && <HabitForm onClose={() => setFormVisible(false)}/>}
    </div>
  )
}

export default page
