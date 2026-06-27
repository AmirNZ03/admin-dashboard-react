import React, { useEffect, useState } from 'react'
import './Header.css'
import { FaAngleDown } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";
import { MdBubbleChart, MdFullscreen } from "react-icons/md";
import { MdLightbulb } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { PiList } from "react-icons/pi";
import Badge from 'react-bootstrap/Badge';
import Lists from "./Lists"
import Message from "./Message"
import Sub from "./Message"
  import { jwtDecode } from "jwt-decode";
import Navbar from '../Navbar/Navbar';

// import NotificationsIcon from '@mui/icons-material/Notifications';
// import EmailIcon from '@mui/icons-material/Email';
// import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
// import LightbulbIcon from '@mui/icons-material/Lightbulb';
// import PersonIcon from '@mui/icons-material/Person';
// import ReorderIcon from '@mui/icons-material/Reorder';

export default function Header() {
  // let sa=document.querySelector(".laa")
 
  //   if (sa.requestFullscreen) {
  //     sa.requestFullscreen();
  //   } else if (sa.webkitRequestFullscreen) { /* Safari */
  //     sa.webkitRequestFullscreen();
  //   } else if (sa.msRequestFullscreen) { /* IE11 */
  //     sa.msRequestFullscreen();
  //   }
  
 const[showlist,setShowList]=useState(false)
 const[showmes,setShowMes]=useState(false)
 const[sublist,setSubList]=useState(false)
 const show=()=>{
  setShowList(false)
 }
 
 const showlis=()=>{
  setShowMes(false)
 }
 const edit=()=>{
  setSubList(false)
 }
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
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
    const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const date=new Date()
const tarikh=date.toLocaleDateString("FA-IR")

// استفاده از Intl برای فرمت‌دهی به زبان فارسی و تقویم شمسی
const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
  weekday: 'long', // نمایش نام کامل روز (مثلاً چهارشنبه)
  
});

// فرمت کردن تاریخ
const formattedDate = formatter.format(date);
  return (
    <>


    <div className='nav'>
<div className='pa'>
 <button  onClick={()=>setShowList(true)} id='dps'>
<FaAngleDown className='ici'/>
    <p className='hami'>{name}</p>
               {image && (
  <img
src={`http://localhost:3001/uploads/${image}`}
    alt="profile"
    className='nac'
  />
)}
    </button>
    <button className='dart' onClick={()=>setShowMes(true)}>
    <IoIosNotifications />

    </button>
            <p className='pm'>{tarikh}</p>
                 <p className='da'> {formattedDate}</p>
    {/* <button className='xas' onClick={()=>setSubList(true)} >
    <FaEnvelope/>
    </button> */}
     <button
        className="hamburger-btn"
        onClick={toggleSidebar}
      >
        ☰
      </button>
      <Navbar   isOpen={isSidebarOpen} 
        closeSidebar={closeSidebar} />
    {/* <button className='laa' >
    <MdFullscreen/>
    </button> */}
   
    {/* <button className='paq' data-lo="#ffffff" data-so="#c7b8b8" data-fa="#000000">
      <MdLightbulb/>
    </button>
    <button className='mc'>
      <FaUser/>
    </button>
    <button className='vn' >
      <PiList/>
    </button> */}
   
    {/* <img src="./48.png" alt="" /> */}
</div>

 
{/* <button>
<NotificationsIcon/>
</button>
<button>
<EmailIcon/>
</button>
<button>
    <FullscreenExitIcon/>
</button>
<button>
    <LightbulbIcon/>
</button>
<button>
<PersonIcon/>
</button>
<button>
<ReorderIcon/>
</button> */}
    </div>{showlist && <Message onsub={show}/>}
    {showmes && <Lists onsubx={showlis}/>}
    {/* {sublist && <Sub onedx={edit}/>} */}
     {isSidebarOpen && (
        <div className="overlay" onClick={closeSidebar}></div>
      )}
    </>
  )
}

