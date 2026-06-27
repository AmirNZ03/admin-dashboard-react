import React from 'react'
import "./Cunsom.css"
import infor from "./box"

export default function Cunsom() {
  return (
    <div className="cunsom-container">
      {infor.map((user)=>(
        <div className='fax' key={user.id}>
          <div className={user.clas}>
            <p className='text' style={{textAlign:"center"}}>{user.title}</p>
          </div>

          <p className='jn'>{user.sub}</p>
        </div>
      ))}
    </div>
  )
}
