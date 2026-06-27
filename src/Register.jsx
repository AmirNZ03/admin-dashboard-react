import React, { useEffect, useState } from 'react';
import "./register.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
export default function Register() {
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
    const navigate = useNavigate();


const handleSubmit = (e) => {
  e.preventDefault();
  setIsSubmitted(true);

  if(name === "" || phone === "" || password === "") {
    setErrors("لطفا همه فیلدها را تکمیل کنید");
    return;
  }

  fetch("http://localhost:3001/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      phone: phone,
      password: password,
    }),
  })
  .then((res) => res.json())
  .then((data) => {
       if (data.error === "اکانت شما مسدود شده است") {
 swal({
  title: "اکانت شما مسدود شده است",
  icon: "warning",
  button: {
    text: "باشه",
    closeModal: true
  },
  dangerMode: true
});

    }
        if (data.error === "این شماره تلفن قبلا ثبت نام کرده است") {
 swal({
  title: "این شماره تلفن قبلا ثبت نام کرده است",
  icon: "warning",
  button: {
    text: "باشه",
    closeModal: true
  },
  dangerMode: true
});

    }
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/main");

    } else if (data.error) {
      setErrors(data.error);
  
     
    } else {

      setErrors("ثبت نام ناموفق بود");
    }
  })
  .catch((err) => {
    console.error("خطا در ثبت:", err);
    setErrors("خطا در برقراری ارتباط با سرور");
  });
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
    if (name === "" || phone === "" || password === "") {
      setErrors("لطفا همه فیلدها را تکمیل کنید");
    } else {
      setErrors("");
    }

    // فعال یا غیرفعال کردن دکمه ثبت نام
    if (
      name !== "" &&
      isValidPhone &&
      password.length >= 8
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, phone, password]);

  const hande = () => {
    setEye(prev => !prev);
  };

  return (
    <div id='pdso'>
    <div id='cont-in'>
      <div id='inputs2'>
        <p className="register-title">ثبت نام</p>

        <label htmlFor="">نام و نام خانوادگی</label>
        <input
          type="text"
          className='names'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button  className={!isDisabled?'regiv':'regiv2'} disabled={isDisabled} onClick={handleSubmit }>ثبت نام</button>
        <Link to="/login" id='regiv-log' >ثبت نام کرده اید وارد شوید</Link>
      </div>
    </div>
    </div>
  );
}
