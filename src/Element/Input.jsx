import React, { useEffect, useRef, useState } from 'react'
import "./input.css"
import swal from 'sweetalert'
export default function Input() {

 const[name,setName]=useState("")

const[files,setFiles]=useState("")
    const[count,setCount]=useState("")
      const[price,setPrice]=useState("")
  const[image,setImage]=useState("")
  const [errors, setErrors] = useState("");
const fileInputRef = useRef(null);
            const addpro=()=>{
              
               if (name === "" || image==="" || price === "" || count==="") {
      setErrors("لطفا همه فیلدها را تکمیل کنید");
      return;
    }
  
   
  
    setErrors("");
              
const formData = new FormData();
formData.append("name", name);
formData.append("count", count);
formData.append("price", price);
formData.append("image", image);

  fetch("http://localhost:3001/api/products/create", {

      method: "POST",
    
      
      body:formData
    })
    .then((res) => res.json())
     .then((result) => {
      console.log("ثبت موفق:", result);
        swal({
    title:"عملیات موفقیت آمیز بود",
    icon: "success",
    button: {
      text: "باشه",
      closeModal: true
    },
    dangerMode: true
  })
  .then(() => {
    window.location.reload()
  })
      setName("")
        setPrice("")
        setImage("")
        setCount("")
        if (fileInputRef.current) {
    fileInputRef.current.value = ""
  }
    })
    .catch((err) => {
      console.error("خطا در ثبت:", err);
    });
   
 
      
    
   
    }











    useEffect(() => {
 

if (count!="" && isNaN(count)) {
  setErrors("موجودی باید عدد باشد");
  return;
}

if (count!="" && Number(count) < 0) {
  setErrors("موجودی نمی تواند منفی باشد");
  return;
}
     
      setErrors("")
     
    
    
    
    }, [count]);

 useEffect(() => {
 

if (price!="" && isNaN(price)) {
  setErrors("قیمت باید عدد باشد");
  return;
}

if (price!="" && Number(price) <= 0) {
  setErrors("قیمت باید بزرگتر از صفر باشد");
  return;
}
     
      setErrors("")
     
    
    
    
    }, [price]);



  return ( 
    
    <div className='tie'>
    <div className='kx'>
      <div className='pqi'>
        <input type="file" ref={fileInputRef} className='cxc'  onChange={(e)=>setImage(e.target.files[0])}  />
        <input type="text" className='lpa' placeholder='موجودی محصول را بنویسید' value={count} onChange={(e)=>setCount(e.target.value)}  />
      </div>
      <div className='pqil'>
        <input type="text" className='asx' placeholder='اسم محصول را بنویسید' value={name} onChange={(e)=>setName(e.target.value)}  />
        <input type="text" className='twe' placeholder='قیمت محصول را بنویسید' value={price} onChange={(e)=>setPrice(e.target.value)}  />
      </div>
    </div>
                      {errors && <p style={{ color: "red" }}>{errors}</p>}

    {/* <button  onClick={addpro} disabled={setErrors("")}>ثبت اطلاعات</button> */}
    <div className='submit'>
    <button
  onClick={addpro}
  disabled={
   
    !!errors
  }
>
  ثبت اطلاعات
</button>
</div>
  </div>
  )
}
