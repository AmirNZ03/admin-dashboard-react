import React, { useState, useEffect } from 'react'
import "./Users.css"
import DeleteModal from './DeleteModal'

import EditModal from './EditModal'
import swal from 'sweetalert'
import { MdOutlinePaid } from "react-icons/md"
import BanModal from './BanModal'
import UnBanModal from './UnBanModal'

export default function Users({filter}) {
  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [productID, setProductID] = useState(null)
  const [productName, setProductName] = useState(null)
  const [productPrice, setProductPrice] = useState(null)
  const [productCount, setProductCount] = useState(null)
  const [products, setProducts] = useState([])
  const [errors, setErrors] = useState("");
  const [isShowBanModal, setIsShowBanModal] = useState(false)
  const [isShowUnBanModal, setisShowUnBanModal] = useState(false)
const [page, setPage] = useState(1);
const [total, setTotal] = useState(0);
const limit = 10;
  useEffect(() => {
    fetch(`http://localhost:3001/api/users/list?page=${page}`)
      .then(res => res.json())
      .then(items => setProducts(items))
      .catch(err => console.error("خطا در گرفتن کاربران:", err))
  }, [page])
const filteredUsers = products.filter(product => {
    // اگه فیلتر خالی بود، همه رو نشون بده
    if (!filter || filter.trim() === '') {
      return true
    }

    const searchTerm = filter.toLowerCase().trim()
    const name = (product.name || '').toLowerCase()
    const phone = (product.phone || '').toLowerCase()

    // چک کن که آیا نام یا شماره شامل عبارت جستجو هست یا نه
    return name.includes(searchTerm) || phone.includes(searchTerm)
  })


  const deleteact = () => {
    setIsShowModal(false)

    fetch(`http://localhost:3001/api/users/delete/${productID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("کاربر حذف شد:", result)
        setIsShowEditModal(false)

        swal({
          title: `کاربر با موفقیت حذف شد`,
          icon: "success",
          button: {
            text: "باشه",
            closeModal: true
          },
          dangerMode: true
        })

        fetch("http://localhost:3001/api/users/list")
          .then((res) => res.json())
          .then((items) => setProducts(items))
      })
      .catch((err) => {
        console.error("خطا در حذف:", err)
      })
  }

  const deleteClos = () => {
    setIsShowModal(false)
  }
   const banact = () => {
    setIsShowBanModal(false)

    fetch(`http://localhost:3001/api/users/ban/${productID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("کاربر حذف شد:", result)
        setIsShowEditModal(false)

        swal({
          title: `کاربر با موفقیت مسدود شد`,
          icon: "success",
          button: {
            text: "باشه",
            closeModal: true
          },
          dangerMode: true
        })

        fetch("http://localhost:3001/api/users/list")
          .then((res) => res.json())
          .then((items) => setProducts(items))
      })
      .catch((err) => {
        console.error("خطا در حذف:", err)
      })
  }

  const banClos = () => {
    setIsShowBanModal(false)
  }
    const unbanact = () => {
    setisShowUnBanModal(false)

    fetch(`http://localhost:3001/api/users/unban/${productID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("کاربر حذف شد:", result)
        setisShowUnBanModal(false)

        swal({
          title: `کاربر با موفقیت رفع مسدود سازی شد`,
          icon: "success",
          button: {
            text: "باشه",
            closeModal: true
          },
          dangerMode: true
        })

        fetch("http://localhost:3001/api/users/list")
          .then((res) => res.json())
          .then((items) => setProducts(items))
      })
      .catch((err) => {
        console.error("خطا در حذف:", err)
      })
  }

  const unbanClos = () => {
    setisShowUnBanModal(false)
  }

  const update = (event) => {
    event.preventDefault()

    fetch(`http://localhost:3001/api/users/edit/${productID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
     name: productName,
  phone: productCount,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("کاربر ویرایش شد:", result)
        setIsShowEditModal(false)

        swal({
          title: `کاربر با موفقیت ویرایش شد`,
          icon: "success",
          button: {
            text: "باشه",
            closeModal: true
          },
          dangerMode: true
        })

        fetch("http://localhost:3001/api/users/list")
          .then((res) => res.json())
          .then((items) => setProducts(items))
      })
      .catch((err) => {
        console.error("خطا در ویرایش:", err)
      })
  }
   useEffect(() => {
    
     
    
      const isValidPhone = /^09\d{9}$/.test(productCount);
    
      if (!isValidPhone && productCount!="") {
        setErrors("شماره موبایل معتبر نیست");
        return;
      }

     
      setErrors("");
      
    
    }, [productCount]);
  
  return (
    
    <div className="adg">

      <div className="users-table-wrapper">
        <table className="sca">
          <thead>
            <tr className="msa">
              <th>عملیات</th>
                                          <th>وضعیت</th>

              <th>شماره تلفن</th>
              <th>نام و نام خانوادگی</th>
              <th>عکس پروفایل</th>

            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((product) => (
              <tr key={product.id}>
                <td data-label="عملیات" className="actions-cell">
                  <button
                    className='hazf'
                    onClick={() => {
                      setIsShowModal(true)
                      setProductID(product.id)
                    }}
                  >
                    حذف
                  </button>

                  <button
                    className='edir'
                    onClick={() => {
                      setIsShowEditModal(true)
                      setProductID(product.id)
                      setProductName(product.name)
                      setProductCount(product.phone)
                    }}
                  >
                    ویرایش
                  </button>
                    <button
                    className='edir'
                    onClick={() => {
                      product.isBanned==1 ?setisShowUnBanModal(true)                  
:     setIsShowBanModal(true)
                      setProductID(product.id)
                      setProductName(product.name)
                      setProductCount(product.phone)
                    }}
                  >
                                     {product.isBanned==1 ? "رفع مسدود سازی":"مسدود سازی"}

                  </button>
                </td>
 <td data-label="وضعیت" className='count'>
 
                  {product.isBanned==1 ? "غیرفعال":"فعال"}
                </td>
                <td data-label="شماره تلفن" className='count'>
                  {product.phone}
                </td>

                <td data-label="نام و نام خانوادگی" className='name'>
                  {product.name}
                </td>

                <td data-label="عکس پروفایل" className='image-cell'>
                  {product.image ? (
                    <img
                      src={`http://localhost:3001/uploads/${product.image}`}
                      alt={product.name}
                      className='aks'
                    />
                  ) : (
                    <span className="no-image">ندارد</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
 
      </div>
   <div className='pagin'>
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    قبلی
  </button>

  <span>صفحه {page}</span>

  <button
    disabled={products.length < 10}
    onClick={() => setPage(page + 1)}
  >
    بعدی
  </button>
</div>
      {isShowModal && (
        <DeleteModal
          submitAction={deleteact}
          cancelAction={deleteClos}
        />
      )}
        {isShowBanModal && (
        <BanModal
          submitAction={banact}
          cancelAction={banClos}
        />
      )}

{isShowUnBanModal && (
        <UnBanModal
          submitAction={unbanact}
          cancelAction={unbanClos}
        />
      )}

      {isShowEditModal && (
        <EditModal
          onClose={() => setIsShowEditModal(false)}
          onSubmit={update}
        >
          <div className='edit-product'>
            <span><MdOutlinePaid /></span>
            <input
              type="text"
              placeholder='نام جدید را وارد کنید'
              className='edit-inp'
              value={productName || ""}
              onChange={(event) => setProductName(event.target.value)}
            />
          </div>

          <div className='edit-product'>
            <span><MdOutlinePaid /></span>
            <input
              type="text"
              placeholder='شماره تلفن جدید را وارد کنید'
              className='edit-inp'
              value={productCount || ""}
              onChange={(event) => setProductCount(event.target.value)}
            />
                              {errors && <p style={{ color: "red" }}>{errors}</p>}

          </div>
        </EditModal>
      )}
    </div>
  )
}
