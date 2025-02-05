import React, { useState } from 'react'
import './users.css'
import {useNavigate} from 'react-router-dom'
import axios from  'axios'
import {server} from '../../main'

const AdminUsers = ({user}) => {
    
    const navigate = useNavigate();

    if(user && user.role !== "admin") return navigate("/");

    const [user, setUser] = useState([])

    async function fetchUsers() {
        try {
            const {data} = await axios.get(`${server}/api/users`)
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>AdminUsers</div>
  )
}

export default AdminUsers