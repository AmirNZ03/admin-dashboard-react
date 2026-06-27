import React, { useEffect, useRef, useState } from 'react'
import "./Box.css";
import infor from "./Data";
import { FaBoxOpen, FaUserFriends } from "react-icons/fa";
import { TbMessages } from "react-icons/tb";
import { IoDiamondOutline } from "react-icons/io5";
import { FiGift } from "react-icons/fi";
import { TiMessages } from "react-icons/ti";
 import { FaUserCheck } from "react-icons/fa";
 import { FaUserSlash } from "react-icons/fa";
// fetch("http://localhost:3001/api/user/count", {

//     headers:""
      
//     })
//     .then((res) => res.json())
//      .then((result) => {
//       console.log("ثبت موفق:", result);
//         swal({
//     title:"عملیات موفقیت آمیز بود",
//     icon: "success",
//     button: {
//       text: "باشه",
//       closeModal: true
//     },
//     dangerMode: true
//   });
//     })
//     .catch((err) => {
//       console.error("خطا در ثبت:", err);
//     });
   
 
// app.get("/api/user/count", (req, res) => {
//   const getmain = `SELECT COUNT(*) FROM users`;
//   productsDB.query(getmain, (error, result) => {
//     if (error) {
//       res.status(500).send(null);
//     } else {
//       res.send(result);
//     }
//   });
// });

export default function Box() {
  // const [count,setCount]=useState(128)
  // const item=useRef(null)
  // item.current.datacol=

 
     

  //    item.current.innerHTML+=


 
  // const [counter,setCount]=useState(0)
  // const [count,setCount]=useState(0)
  // // v
  // let vc=document.querySelector(".nvc")
  // // useEffect(
    
    
  // window.addEventListener("load",(vc)=>{
  //   let xc=setInterval(() => {
  //     let ds=vc.innerHTML
  //     if(ds==count){
  //       clearInterval(xc)
  //     }
  //     ds++
  //   }, 0.5)
  // })  

  // )
     const[count,setCount]=useState([])
     const[product,setProduct]=useState([])
          const[countBan,setCountBan]=useState([])

               const[countUnBan,setCountUnBan]=useState([])


useEffect(() => {
  fetch("http://localhost:3001/api/user/count")
    .then(res => res.json())
    .then(data => {
      const countValue = data[0]["COUNT(*)"]; 
      setCount(countValue);
    })
    .catch(err => console.error("خطا در گرفتن تعداد کاربر:", err));
}, []);
useEffect(() => {
  fetch("http://localhost:3001/api/products/count")
    .then(res => res.json())
    .then(data => {
      const countValue = data[0]["COUNT(*)"]; 
      setProduct(countValue);
    })
    .catch(err => console.error("خطا در گرفتن تعداد کاربر:", err));
}, []);
useEffect(() => {
  fetch("http://localhost:3001/api/user/ban/count")
    .then(res => res.json())
    .then(data => {
      const countValue = data[0]["COUNT(*)"]; 
      setCountBan(countValue);
    })
    .catch(err => console.error("خطا در گرفتن تعداد کاربر:", err));
}, []);
useEffect(() => {
  fetch("http://localhost:3001/api/user/unban/count")
    .then(res => res.json())
    .then(data => {
      const countValue = data[0]["COUNT(*)"]; 
      setCountUnBan(countValue);
    })
    .catch(err => console.error("خطا در گرفتن تعداد کاربر:", err));
}, []);
  return (
    
    <>
    <div className="box-container">

    {/* <div className='boxi'> */}
     
      {/* <div className='saman'> */}
     

       
      {/* <span className='vmx'>
        <TiMessages/>
        </span> */}
       
        {/* <div className='mesui'>
        <span id='ami'>
          <TiMessages/>
        </span>
          <p className='nvc' >256</p>
          <p className='yas'>پیام</p>
        </div> */}
             
      {/* </div> */}
     
    {/* </div> */}
  
   <div className='boxi' >
     
   <div className='saman'>
  

    

    
     <div className='mesui'>
     <span id='amicv'>
        {/* <FiGift /> */}
        <FaBoxOpen />
        </span>
       <p>{product}</p>
       <p className='yas'>کل محصولات</p>
     </div>
          
   </div>
  
 </div>
   <div className='boxi' >
     
    <div className='saman'>
   

     

     
      <div className='mesui'>
        <span id='amic'>
        {/* <IoDiamondOutline/> */}
        <FaUserSlash />
        </span>
        <p>{countBan}</p>
        <p className='yasx'>کاربران مسدود</p>
      </div>
           
    </div>
   
  </div>
   <div className='boxi' >
     
    <div className='saman'>
   

     

     
      <div className='mesui'>
        <span id='amic'>
        {/* <IoDiamondOutline/> */}
        <FaUserCheck />
        </span>
        <p>{countUnBan}</p>
        <p className='yasx'>کاربران فعال</p>
      </div>
           
    </div>
   
  </div>
  <div className='boxi' >
     
  <div className='saman'>
 

   


    <div className='mesui'>
    <span id='amicv'>
        <FaUserFriends />
        </span>
        
          <p>{count}</p>
      <p className='yas'>کل کاربران</p>
      
    </div>
               
  
  </div>
 
</div>
</div>
</>
  )
}
