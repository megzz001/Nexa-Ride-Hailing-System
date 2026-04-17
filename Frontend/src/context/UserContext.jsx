import { createContext, useState } from 'react'

export const UserDataContext = createContext()

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email:'',
    fullName:{
      firstName:'',
      lastName:''
    },
    role:''
  })

  const value = {
    user,
    setUser
  }

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserContext
