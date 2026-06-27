import React from 'react'
import "./Main.css"
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
const date=new Date()
const tarikh=date.toLocaleDateString("FA-IR")

// استفاده از Intl برای فرمت‌دهی به زبان فارسی و تقویم شمسی
const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
  weekday: 'long', // نمایش نام کامل روز (مثلاً چهارشنبه)
  
});

// فرمت کردن تاریخ
const formattedDate = formatter.format(date);

export default function Main() {
  return (
    <>
    </>
//     <div className='ls'>
// <div className='head'>
//     <div className='ico'>
//       <span id='nva'>
// <FaCalendarAlt/>
// </span>
//         <p className='pm'>{tarikh}</p>
//                  <p className='da'> {formattedDate}</p>

       
//         {/* <p className='da'>چهارشنبه</p>
//         <p className='pis'>پنل ادمین</p> */}
//     </div>
// </div>
//     </div>
  )
}
