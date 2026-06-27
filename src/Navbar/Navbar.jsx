import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { Link, NavLink } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { SlBasket, SlLogout } from "react-icons/sl";
import { BsChatLeftText } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { CiDiscount1 } from "react-icons/ci";
import jwt_decode from "jwt-decode";

import { jwtDecode } from "jwt-decode";

// const bch=(event)=>{
// event.target.style.backgroundColor="blueviolet"
// event.target.style.height="3rem"
// event.target.style.width="9rem"
// event.target.style.color="#AAB3D9"
// event.target.style.borderRadius="0.5rem"
// }
// import SearchIcon from '@mui/icons-material/Search';
export default function Navbar


({ isOpen }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");


useEffect(() => {
  let token = localStorage.getItem("token");
  if (token) {
    token = token.trim(); // حذف فاصله‌ها و کاراکترهای اضافی
    try {
      const decoded = jwtDecode(token);
      console.log("✅ decoded:", decoded);
      setName(decoded.name);
      setImage(decoded.image)
    } catch (error) {
      console.error("❌ خطا در دیکد کردن توکن:", error);
    }
  }
}, []);
const handlelog=()=>{
      localStorage.removeItem("token")
            localStorage.removeItem("welcomed")

            // localStorage.setItem("welcomed","false");


}

  return (
    // <div className='coli'>
    <div className={`coli ${isOpen ? "open" : ""}`}>

<div className='as'>
  <p style={{fontSize:"20px"}}>👋</p>
  <p style={{fontSize:"15px"}}>{name}</p>
  <p className='ma'>خوش آمدید</p>
</div>
<div className='navi'>
{/* <SearchIcon/> */}
<div className='box'>
  <button className='saa'>
{/* <IoIosSearch/> */}
</button>
{/* <input type="text" placeholder="جستجو" className='sear' /> */}
</div>
<div className='la'>
  <div className='xa'>
    <p className='nj'>{name}</p>
    {/* <p className='fa'>مدیر فنی</p> */}
    <div className='yi'>
      <div className='nz'>
        <p>دردسترس</p>
        <div className='cir'></div>
      </div>
    </div>

 
  </div>
               {image && (
  <img
src={`http://localhost:3001/uploads/${image}`}
    alt="profile"
    className='dpal'
  />
)}
</div>
<div className='nzl' >
  <NavLink to="/main"   className={({ isActive }) => (isActive ? 'active' : '')}>
  <p>صفحه اصلی</p>
  <span id='oa'>
<IoMdHome/>
</span>
  </NavLink>
</div>
<div className='nzl'>
<NavLink to="/edit-password"   className={({ isActive }) => (isActive ? 'active' : '')}>
  <p>تغییر رمز عبور</p>
  <span id='oa'>
<FaLock/>
  </span>
  </NavLink>
</div>
<div className='nzl'>
<NavLink to="/products"  className={({ isActive }) => (isActive ? 'active' : '')}>
  <p>محصولات</p>
  <span id="oa">
    <SlBasket/>
  </span>
  </NavLink>
</div>
{/* <div className='nzl'>
<NavLink to="/chat"   className={({ isActive }) => (isActive ? 'active' : '')}>
  <p>چت</p>
  <span id="oa">
<BsChatLeftText/>
  </span>
  </NavLink>
</div> */}
<div className='nzl'>
<NavLink to="/edit-profile"   className={({ isActive }) => (isActive ? 'active' : '')}>
  <p className='vira'>ویرایش پروفایل</p>
  <span id="oas">
<FaEdit/>
  </span>
  </NavLink>
</div>
<div className='nzl'>
<NavLink to="/users"   className={({ isActive }) => (isActive ? 'active' : '')}>
  <p>کاربران</p>
  <span id="oa">
<FaUsers/>
  </span>
  </NavLink>
</div>
{/* <div className='nzlf'>
<NavLink to="/takhfif"   className={({ isActive }) => (isActive ? 'active' : '')}>
  <p>تخفیفات</p>
  <span id="oa">
<CiDiscount1/>
  </span>
  </NavLink>
 
</div> */}
<div className='nzlf'>

 <NavLink to="/login"   className={({ isActive }) => (isActive ? 'active' : '')} onClick={handlelog}>
  <p>خروج</p>
  <span id="oa">
<SlLogout/>
  </span>
  </NavLink>
  </div>
</div>

    </div>
  )
}
