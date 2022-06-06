import React from 'react'
import "../styles.css"
import { API } from "../backend"
import Base from './Base'



const Home = () => {
  console.log("API IS ", API)
  return (
    <Base title='Home Page' >
      <div>
        
      </div>
    </Base>
  )
}

export default Home