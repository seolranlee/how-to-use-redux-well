import constate from "constate"
import { createContext, useContext, useEffect, useState } from "react"

// Context를 따로 만들지 않고, 관리하고 싶은 상태를 위한 Hook 작성
function useUser() {
  const [user, setUser] = useState(null)
  return { user, setUser }
}

// useUser Hook을 기반으로 종류별로 Context를 만들고
// 해당 Context를 사용하는 Provider와 Hook생성
const [UserProvider, useUserValue, useUserUpdate] = constate(
  useUser,
  value => value.user,
  value => value.setUser
)

function UserInfo() {
  useEffect(() => {
    console.log('UserInfo rerendering')
  })
  const user = useUserValue()
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