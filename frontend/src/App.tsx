import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useQuery } from '@tanstack/react-query'

interface LoanProfile {
  id: number
  business_type: string
}
function App() {
  const [count, setCount] = useState(0)

  const { data, error, isLoading } = useQuery<LoanProfile[]>({
    queryKey: ['loan-profiles'],
    queryFn: async () => {
      const response = await fetch('/backend/api/loanprofile/')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })

  return (
    <>
      <h1>Loan Profil</h1>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>
            {data ? data.map((loanProfile) => (
              <div key={loanProfile.id}>
                <p>{loanProfile.business_type}</p>
              </div>
            )) : null}
          </div>
        )}
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
