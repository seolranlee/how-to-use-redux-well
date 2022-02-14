// import constate from "constate"
import { useEffect, useState } from "react"
import { ErrorBoundary } from 'react-error-boundary'

// // Context를 따로 만들지 않고, 관리하고 싶은 상태를 위한 Hook 작성
// function useUser() {
//   const [user, setUser] = useState(null)
//   return { user, setUser }
// }

// // useUser Hook을 기반으로 종류별로 Context를 만들고
// // 해당 Context를 사용하는 Provider와 Hook생성
// const [UserProvider, useUserValue, useUserUpdate] = constate(
//   useUser,
//   value => value.user,
//   value => value.setUser
// )

// function UserInfo() {
//   useEffect(() => {
//     console.log('UserInfo rerendering')
//   })
//   const user = useUserValue()
//   if (!user) return <div>사용자 정보가 없습니다.</div>
//   return <div>{user.username}</div>
// }

// function Authenticate() {
//   useEffect(() => {
//     console.log('Authenticate rerendering')
//   })
//   const setUser = useUserUpdate()
//   const onClick = () => {
//     setUser({ username: 'seolranlee' })
//   }
//   return <button onClick={onClick}>사용자 인증</button>
// }

// export default function App() {
//   return (
//     <UserProvider>
//       <UserInfo />
//       <Authenticate />
//     </UserProvider>
//   )
// }

// Error Boundary
// function ErrorBoundary({children}) {
//   const [error, setError] = useState(null)
//   const [errorInfo, setErrorInfo] = useState(null)

//   useEffect(() => {
//     setError(error)
//     setErrorInfo(errorInfo)
    
//     console.log('error', error)
//     console.log('errorInfo', errorInfo)
//   }, [error, errorInfo])
  
//   return (
//     <>
//       {errorInfo && (
//         <div>
//           <h2>Something went wrong.</h2>
//           <details style={{ whiteSpace: 'pre-wrap' }}>
//             {error && error.toString()}
//             <br/>
//             {errorInfo && errorInfo.componentStack}
//           </details>
//         </div>
//       )}
//       {children}
//     </>
//   )
// }

function OurFallbackComponent({ error, componentStack, resetErrorBoundary }) {
  return (
    <div>
      <h2>Something went wrong.</h2>
      <details style={{ whiteSpace: 'pre-wrap' }}>
        {error.message}
        <br/>
        {componentStack}
      </details>
      <button onClick={resetErrorBoundary}>Try again</button>
      {/* <h1>An error occurred: {error.message}</h1>
      <button onClick={resetErrorBoundary}>Try again</button> */}
    </div>
  );
};

function BuggyCounter() {
  const [counter, setCounter] = useState(0)
  const handleClick = () => {
    setCounter((prev) => prev + 1)
  }

  if (counter === 5) throw new Error('I crashed!');

  return (
    <>
      <h1 onClick={handleClick}>{counter}</h1>
    </>
  )
}

export default function App() {
  return (
    <div>
      <p>
        <b>
          This is an example of error boundaries in React 16.
          <br /><br />
          Click on the numbers to increase the counters.
          <br />
          The counter is programmed to throw when it reaches 5. This simulates a JavaScript error in a component.
        </b>
      </p>
      <hr />
        <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
      <ErrorBoundary
        FallbackComponent={OurFallbackComponent}
      >
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>
      <hr />
      <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
      <ErrorBoundary
        FallbackComponent={OurFallbackComponent}

      >
        <BuggyCounter />
      </ErrorBoundary>
      <ErrorBoundary
        FallbackComponent={OurFallbackComponent}
      >
        <BuggyCounter />
      </ErrorBoundary>
    </div>
  );
}
