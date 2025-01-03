import { Fragment } from 'react'
import './App.css'
import { ApplicationRoutes } from './routes/ApplicationRoutes'
import { RootProvider } from './providers'

function App() {
  return (
    <Fragment>
      <RootProvider>
        <ApplicationRoutes />
      </RootProvider>
    </Fragment>
  )
}

export default App
