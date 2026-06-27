import React from 'react'
import "./deletemodal.css"
import ReactDOM from 'react-dom'
export default function UnBanModal({submitAction,cancelAction}) {
  return ReactDOM.createPortal (
    <div className='mod act'>
       <div className='aoc'>
        <h1>آیا از رفع مسدود سازی کاربر اطمینان دارید؟</h1>
        <div className='btns'>
            <button className='delete acce' onClick={()=>submitAction()}>بله</button>
            <button className='delete no' onClick={()=>cancelAction()}>خیر</button>
        </div>
        </div>
       </div>,document.getElementById('modal')
    
  )
}
