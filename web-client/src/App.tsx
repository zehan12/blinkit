/*-------------------------------------------------------------------
|                    🚀 BLINKIT APP 🚀
|
|  HELLO 👋! WELCOME TO THE BLINKIT ONLINE DELIVERY APP. I CREATED THIS APP USING REACT, 
|  WHICH FETCHES DATA FROM AN EXTERNAL API TO DISPLAY a wide range of delivery options.
|  EXPERIENCE seamless online ordering with quick, intuitive interfaces. 
|  Manage your orders, track deliveries, and explore products with ease. 
|  FEEL FREE TO REACH OUT TO ME OR OPEN AN ISSUE 
|  ON GITHUB. THANKS!
|
|  🔗CREATOR: https://github.com/zehan12
|  🔗SOURCE CODE: https://github.com/zehan12/blinkit
|
*-------------------------------------------------------------------*/
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
