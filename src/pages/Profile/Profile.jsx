import React from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const {id} = useParams();
  return (
    <div>
      <div>Profile - {id} </div>
    </div>
  )
}

export default Profile
