import React, { useEffect, useState } from 'react';
import "./register.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function Login() {
    const navigate = useNavigate();

  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(false);
  const [passworder, setPassworder] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [passwordFocused, setPasswordFocused] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitted(true);

  if ( phone === "" || password === "") {
    setErrors("لطفا همه فیلدها را تکمیل کنید");
    return;
  }

  try {
    const res = await fetch("http://localhost:3001/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/main")
      
        window.location.reload(); // ✅ برای اینکه Navbar آپدیت شه

    } 
    if(res.status===403){
       swal({
        title: "اکانت شما مسدود است",
        icon: "warning",
        button: {
          text: "باشه",
          closeModal: true
        }
      });
    }
    else {
      setErrors("ورود ناموفق بود");
    }
  } catch (err) {
    console.error(err);
    setErrors("خطا در برقراری ارتباط با سرور");
  }
};

  useEffect(() => {
    // چک شماره موبایل
    const isValidPhone = /^09\d{9}$/.test(phone);
    if (phone !== "" && !isValidPhone) {
      setError("شماره موبایل معتبر نیست");
    } else {
      setError("");
    }

    // چک پسورد
    if (password !== "" && password.length < 8) {
      setPassworder("رمز عبور باید حداقل 8 کاراکتر داشته باشد");
    } else {
      setPassworder("");
    }

    // چک پر بودن همه فیلدها
    if ( phone === "" || password === "") {
      setErrors("لطفا همه فیلدها را تکمیل کنید");
    } else {
      setErrors("");
    }

    // فعال یا غیرفعال کردن دکمه ثبت نام
    if (
    
      isValidPhone &&
      password.length >= 8
    
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
 
},[ phone, password]);

  const hande = () => {
    setEye(prev => !prev);
  };

  return (
        <div id='pdso'>

    <div id='cont-in'>
      <div id='inputs2'>
                <p className="register-title">ورود به پنل مدیر</p>

        <p className="register-title2">لطفا اطلاعات خود را وارد کنید</p>

      

        <label htmlFor="">تلفن همراه</label>
        <input
          type="text"
          className='names'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}

        <label htmlFor="">رمز عبور</label>
        <div className='ink'>
          <button type="button" onClick={hande} style={{ cursor: 'pointer' }}>
            {eye ? <FaEyeSlash style={{ marginTop: "0.3rem" }} /> :
              <FaEye style={{ marginTop: "0.3rem" }} />}
          </button>

          <input
            type={eye ? "text" : "password"}
            className={`namesi ${passwordFocused ? "focused" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
        </div>
        {passworder && <p style={{ color: "red" }}>{passworder}</p>}
{isSubmitted && errors && <p style={{color:"red"}}>{errors}</p>}

        <button  className={!isDisabled?'regiv':'regiv2'} disabled={isDisabled} onClick={handleSubmit}>ورود</button>
        {/* <Link to="/" id='regiv-log' >حساب ندارید ثبت نام کنید</Link> */}
      </div>
    </div>
    </div>
  );
}
