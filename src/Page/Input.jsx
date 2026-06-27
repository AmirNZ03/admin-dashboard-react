import React, { useState,useEffect, useRef } from 'react'
import "./input.css"
import swal from 'sweetalert'

export default function Input() {
  const [name, setName] = useState("")
  const [count, setCount] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [errors, setErrors] = useState("");
  const [password,setPassword]=useState("")
    const [passworder, setPassworder] = useState("");
  
const fileInputRef = useRef(null);

  const addpro = () => {
    if (name === "" || image==="" || price === "" || password === "") {
      setErrors("لطفا همه فیلدها را تکمیل کنید");
      return;
    }
  
   
  
    setErrors("");
    const formData = new FormData()
    formData.append("name", name)
    // formData.append("count", count);
    formData.append("price", price)
    formData.append("image", image)
    formData.append("password", password)

    fetch("http://localhost:3001/api/users/create", {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("ثبت موفق:", result)
        swal({
          title: "عملیات موفقیت آمیز بود",
          icon: "success",
          button: {
            text: "باشه",
            closeModal: true
          },
          dangerMode: true
        }).then(() => {
    window.location.reload()
  })
  
        setName("")
        setPrice("")
        setImage("")
        setPassword("")
        if (fileInputRef.current) {
    fileInputRef.current.value = ""
  }
      })
      .catch((err) => {
        console.error("خطا در ثبت:", err)
      })
      
  }
  
    useEffect(() => {
    
     
    
      const isValidPhone = /^09\d{9}$/.test(price);
    
      if (!isValidPhone && price!="") {
        setErrors("شماره موبایل معتبر نیست");
        return;
      }
    
      setErrors("");
      
    if (password !== "" && password.length < 8) {
      setPassworder("رمز عبور باید حداقل 8 کاراکتر داشته باشد");
    } else {
      setPassworder("");
    }
    }, [price,password]);
  

  return (
    <div className='tie'>
      <div className='kx'>
        <div className='pqi'>
          <input
            type="file"
            className='cxc'
              ref={fileInputRef}

            onChange={(e) => setImage(e.target.files[0])}
          />
          <input
            type="text"
            className='asx'
            placeholder='رمز عبور کاربر را بنویسید'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
                  {passworder && <p style={{ color: "red" }}>{passworder}</p>}

          {/* <input type="text" className='lpa' placeholder=' محصول را بنویسید' value={count} onChange={(e)=>setCount(e.target.value)}  /> */}
        </div>

        <div className='pqil'>
          <input
            type="text"
            className='asx'
            placeholder='نام کاربر را بنویسید'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className='twe'
            placeholder='شماره تلفن کاربر را بنویسید'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
                  {errors && <p style={{ color: "red" }}>{errors}</p>}
    <div className='submit'>

      <button className='submit-btn' onClick={addpro} disabled={
   
    !!errors
    && !!passworder
  }>
        ثبت اطلاعات
      </button>
      </div>
    </div>
  )
}
