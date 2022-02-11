import { createContext, useContext, useEffect, useState } from "react"

const UserContext= createContext(null)
const UserUpdateContext = createContext(null)

function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={setUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  ) 
}

function useUser() {
  return useContext(UserContext)
}

function useUserUpdate() {
  return useContext(UserUpdateContext)
}

function UserInfo() {
  useEffect(() => {
    console.log('UserInfo rerendering')
  })
  const user = useUser()
  if (!user) return <div>사용자 정보가 없습니다.</div>
  return <div>{user.username}</div>
}

function Authenticate() {
  useEffect(() => {
    console.log('Authenticate rerendering')
  })
  const setUser = useUserUpdate()
  const onClick = () => {
    setUser({ username: 'seolranlee' })
  }
  return <button onClick={onClick}>사용자 인증</button>
}

export default function App() {
  return (
    <UserProvider>
      <UserInfo />
      <Authenticate />
    </UserProvider>
  )
}