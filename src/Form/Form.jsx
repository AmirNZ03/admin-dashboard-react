import React, { useEffect, useState } from 'react'
import "./Form.css"
import { FaAngleUp } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { SiMinutemailer } from "react-icons/si";
import { FaLock } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { jwtDecode } from 'jwt-decode';
import swal from 'sweetalert';
export default function Form() {
  const[password,setPassword]=useState("")
  const [newpassword,setNewPassword]=useState("")
      const [passworder, setPassworder] = useState("");
  
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      token = token.trim(); // حذف فاصله‌ها و کاراکترهای اضافی
      try {
        const decoded = jwtDecode(token);
        console.log("✅ decoded:", decoded);
        setPassword(decoded.password);

      } catch (error) {
        console.error("❌ خطا در دیکد کردن توکن:", error);
      }
    }
  }, [password]);
 
          const handleclick=()=>{
           
                let token = localStorage.getItem("token");
                 
                          const decodef = jwtDecode(token);
                 console.log("iddec",decodef.id);
                 

      fetch("http://localhost:3001/api/users/edit/password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
     id:decodef.id,
      password: newpassword,
    }),
  })
  .then((res) => res.json())
  .then((data) => {
    if (data.token) {
    localStorage.setItem("token", data.token); // 🆕 توکن جدید رو ذخیره کن
  }
 swal({
  title: "رمز عبور با موفقیت تغییر یافت",
  icon: "success",
  button: {
    text: "باشه",
    closeModal: true
  },
  dangerMode: true
});
decodef.password=newpassword
    })
  
 
  }
   useEffect(() => {
      
       
      
        
        
      if (newpassword !== "" && newpassword.length < 8) {
        setPassworder("رمز عبور باید حداقل 8 کاراکتر داشته باشد");
      } else {
        setPassworder("");
      }
      }, [newpassword]);
  return (
    <div className='matmx'>
      <div className='qo'>
        <button className='ang'>
          <div className='up'>
<FaAngleUp/>
</div>
        </button>
        <p className='paf'>تغییر رمز عبور</p>
        <div className='edt'>
<FaLock/>
</div>
        
      </div>
      <div className='line'>

</div>
<div className='cmaz'>
        <p className='xam'>استفاده از کاراکترهای خاص جهت حفظ موارد امنیتی توصیه می گردد. همچنین رمز ورودی باید دست کم 8 کاراکتر باشد.</p>
        {/* <div className='madz'>
<IoIosNotificationsOutline/>
</div> */}
      </div>
<div className='xpa'>
<div className='marg'>
  <span id='cnz'>
<IoIosLock/>
  </span>
</div>
<div className='xpa'>
<p className='lfl'>رمز عبور پیشین</p>
<input type="text" className='lasq' value={password} readOnly />
</div>
<div className='xpa'>
<p className='lfl'>رمز عبور جدید</p>
<input type="text" className='lasq'  value={newpassword} onChange={(e)=>setNewPassword(e.target.value)}/>
</div>
                  {passworder && <p style={{ color: "red" }}>{passworder}</p>}

<div id='ali'>
  <button className='zah' onClick={handleclick} disabled={!!passworder}>ذخیره</button>
</div>
</div>

      </div>
  )
}

