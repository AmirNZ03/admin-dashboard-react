import React, { useEffect, useState } from 'react'
import "./order.css"
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'
// import {AiOutlineDollarCircle} from "react-icons"
import swal from 'sweetalert';
import { MdOutlinePaid } from "react-icons/md";
export default function Order({filter}) {
    const[isShowModal,setIsShowModal]=useState(false)
    const[isShowEditModal,setIsShowEditModal]=useState(false)
    const[productID,setProductID]=useState(null)
    const[productName,setProductName]=useState(null)
    const[productPrice,setProductPrice]=useState(null)
    const[productCount,setProductCount]=useState(null)
      const[products,setProducts]=useState( [])
        const [errors, setErrors] = useState("");
      
      const [page, setPage] = useState(1);
useEffect(()=>{
  fetch(`http://localhost:3001/api/products?page=${page}`)
.then(res=>res.json())
.then(items=>setProducts(items))
    .catch(err => console.error("خطا در گرفتن محصولات:", err))

console.log(products);

},[page])
const filteredProducts = products.filter(product =>
  product.name
    .toLowerCase()
    .includes(filter.toLowerCase())
);

    // const[isShowDet,setIsShowDet]=useState(false)
    const deleteact=()=>{
        setIsShowModal(false)
    fetch(`http://localhost:3001/api/products/delete/${productID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
   
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("محصول ویرایش شد:", result);
      setIsShowEditModal(false);
      
      swal({
        title: `محصول با موفقیت حذف شد`,
        icon: "success",
        button: {
          text: "باشه",
          closeModal: true
        },
        dangerMode: true
      });
      // لیست محصولات را دوباره بگیر
      fetch("http://localhost:3001/api/products")
        .then((res) => res.json())
        .then((items) => setProducts(items));
    })
    .catch((err) => {
      console.error("خطا در ویرایش:", err);
    });
        
    }
    const deleteClos=()=>{
        console.log("باز");
        
        setIsShowModal(false)
    }
  const update = (event) => {
  event.preventDefault();

  fetch(`http://localhost:3001/api/products/edit/${productID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: productName,
      price: productPrice,
      count: productCount,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("محصول ویرایش شد:", result);
      setIsShowEditModal(false);
      
      swal({
        title: `محصول با موفقیت ویرایش شد`,
        icon: "success",
        button: {
          text: "باشه",
          closeModal: true
        },
        dangerMode: true
      });
      // لیست محصولات را دوباره بگیر
      fetch("http://localhost:3001/api/products")
        .then((res) => res.json())
        .then((items) => setProducts(items));
    })
    .catch((err) => {
      console.error("خطا در ویرایش:", err);
    });
};


    useEffect(() => {
 

if (productPrice!="" && isNaN(productPrice)) {
  setErrors("قیمت باید عدد باشد");
  return;
}

if (productPrice!="" && Number(productPrice) <= 0) {
  setErrors("قیمت باید بزرگتر از صفر باشد");
  return;
}
     
      setErrors("")
     
    
    
    
    }, [productPrice]);
     useEffect(() => {
     
    
    if (productCount!="" && isNaN(productCount)) {
      setErrors("موجودی باید عدد باشد");
      return;
    }
    
    if (productCount!="" && Number(productCount) < 0) {
      setErrors("موجودی نمی تواند منفی باشد");
      return;
    }
         
          setErrors("")
         
        
        
        
        }, [productCount]);
  return (
    <div>
        <div className="adg">
    
    <table className='sca'>
     
  <thead class="msa">

        <tr  >
                    <th>
عملیات       
 </th>

          <th >
تعداد         
 </th>
           <th>
قیمت         
 </th>
          <th >
            اسم
          </th>
          <th >
            عکس
          </th>
        </tr>
        </thead>
 <tbody>
{filteredProducts.map((product)=>(
  <tr key={product.id}>
          
          <td data-label="عملیات">
          <button  className='hazf' onClick={()=>{setIsShowModal(true) 
            setProductID(product.id)
          }}>حذف</button>
          <button className='edir' onClick={()=>{setIsShowEditModal(true)
setProductName(product.name)
setProductCount(product.count)
setProductPrice(product.price)
            setProductID(product.id)

          }}>ویرایش</button>
         </td>
            <td className='count' data-label="تعداد">{product.count}</td>

            <td className='price' data-label="قیمت">{Number(product.price).toLocaleString()} تومان 
</td>

            <td className='name' data-label="اسم">{product.name}</td>
                          {product.image && (
                          <td data-label="عکس">
  <img
src={`http://localhost:3001/uploads/${product.image}`}
    alt={product.name}
className='aks'  />
  </td>
)} 
            {/* <td><img src={product.image} alt="" className='aks' /></td> */}
          
          
          </tr>
))}
        
        </tbody>
     

    
      </table>
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
      {isShowModal && <DeleteModal submitAction={deleteact} cancelAction={deleteClos} msg={"آیا از حذف اطمینان دارید؟"}/>}
    
    { isShowEditModal && <EditModal
      onClose={()=>setIsShowEditModal(false)}
      onSubmit={update}
      >
<div className='edit-product'>
  <span>
<MdOutlinePaid/>
  </span>
  <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-inp' value={productName} onChange={(e)=>setProductName(e.target.value)}/>
</div>
<div className='edit-product'>
  <span>
  <MdOutlinePaid/>
  </span>
  <input type="text" placeholder='موجودی جدید را وارد کنید' className='edit-inp' value={productCount} onChange={(e)=>setProductCount(e.target.value)}/>
</div>
<div className='edit-product'>
  <span>
  <MdOutlinePaid/>
  </span>
  <input type="text" placeholder='قیمت جدید را وارد کنید' className='edit-inp' value={productPrice} onChange={(event)=>
    setProductPrice(event.target.value)
  }/>
                        {errors && <p style={{ color: "red" }}>{errors}</p>}

</div>
</EditModal>}
 
    </div>
    </div>
  )
}
