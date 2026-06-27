import React, { useEffect, useState } from "react";
import "./Chart.css";
import { FaAngleUp } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import swal from "sweetalert";

export default function Chart() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setName(decoded.name || "");
      setPhone(decoded.phone || "");
      setImage(decoded.image || "");
    }
  }, []);


const handleclick = () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const decodef = jwtDecode(token);

  const formData = new FormData();
  formData.append("id", decodef.id);
  formData.append("name", name);
  formData.append("phone", phone);

  if (image instanceof File) {
    formData.append("image", image);
  }

  fetch("http://localhost:3001/api/users/edit/profile", {
    method: "PUT",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        const decoded = jwtDecode(data.token);
        setName(decoded.name || "");
        setPhone(decoded.phone || "");
        setImage(decoded.image || "");
      }

      swal({
        title: "اطلاعات شما با موفقیت ویرایش شد",
        icon: "success",
        button: "باشه",
      });
    })
    .catch(() => {
      swal({
        title: "خطا در ویرایش اطلاعات",
        icon: "error",
        button: "باشه",
      });
    });
};



useEffect(() => {

  if (name === "" || phone === "") {
    setErrors("لطفا همه فیلدها را تکمیل کنید");
    return;
  }

  const isValidPhone = /^09\d{9}$/.test(phone);

  if (!isValidPhone) {
    setErrors("شماره موبایل معتبر نیست");
    return;
  }

  setErrors("");

}, [name, phone]);

  return (
    <div className="profile-card">
      <div className="profile-header">
        <button className="back-btn">
          <FaAngleUp />
        </button>

        <div className="header-title">
          <FaRegEdit />
          <p>ویرایش پروفایل</p>
        </div>
      </div>

      <div className="divider"></div>

      <div className="alert-box">
        <p>مدارک احراز هویت شما در حال بررسی می‌باشد. لطفاً تا مشخص شدن وضعیت صبور باشید.</p>
      </div>

      <div className="profile-top">
        <div className="profile-info">
          <p className="profile-name">نام کاربری</p>
          <p className="profile-role">مدیر ارشد</p>

          <div className="status-box">
            <span className="status-dot"></span>
            <span>دردسترس</span>
          </div>
        </div>

        {image && (
          <img
            src={
              image instanceof File
                ? URL.createObjectURL(image)
                : `http://localhost:3001/uploads/${image}`
            }
            alt="profile"
            className="profile-image"
          />
        )}
      </div>

      <div className="form-section">
        <div className="form-group full-width">
          <label>تصویر پروفایل</label>
          <input
            type="file"
            className="form-input"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="form-group full-width">
          <label>نام و نام خانوادگی</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group full-width">
          <label>موبایل</label>
          <input
            type="text"
            className="form-input"
            placeholder="09---------"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

        </div>
                  {errors && <p style={{ color: "red" }}>{errors}</p>}

        <div className="button-row">
          {/* <button className="cancel-btn">بازگشت</button> */}
          <button className="save-btn" onClick={handleclick} disabled={!!errors}>
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}
