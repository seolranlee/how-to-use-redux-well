import { createContext, useContext, useEffect, useState } from "react"

const UserContext= createContext(null)
const UserUpdateContext = createContext(null)

function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [count, setCount] = useState(0)
  return (
    <UserContext.Provider value={{user, count}}>
      <UserUpdateContext.Provider value={{setUser, setCount}}>
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
  const { user } = useUser()
  if (!user) return (
    <div>
      <h1>user</h1>
      <div>사용자정보가 없습니다.</div>
    </div>
  )
  return (
    <div>
      <h1>user</h1>
      <div>{user.username}</div>
    </div>
  )
}

function CountInfo() {
  useEffect(() => {
    console.log('CountInfo rerendering')
  })
  const { count } = useUser()

  return (
    <div>
      <h1>Count</h1>
      <div>{count}</div>
    </div>
  )
}

function Authenticate() {
  useEffect(() => {
    console.log('Authenticate rerendering')
  })
  const { setUser } = useUserUpdate()
  const updateUser = () => {
    setUser({ username: 'seolranlee' })
  }
  return (
    <div>
      <button onClick={updateUser}>사용자 인증</button>
    </div>
  )
}

function CountIncrease() {
  useEffect(() => {
    console.log('CountIncrease rerendering')
  })
  const { setCount } = useUserUpdate()
  const onIncrease = () => {
    setCount(prev => prev + 1)
  }
  return (
    <div>
      <button onClick={onIncrease}>count + 1</button>
    </div>
  )
}

export default function App() {
  return (
    <UserProvider>
      <UserInfo />
      <CountInfo />
      <Authenticate />
      <CountIncrease />
    </UserProvider>
  )
}