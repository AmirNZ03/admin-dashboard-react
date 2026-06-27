import React, { useEffect, useState } from 'react'
import "./search.css"
export default function Search({place , filter,
    setFilter,route,title}) {
    
     useEffect(()=>{
 

  fetch(`http://localhost:3001${route}`
, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filter: filter,
   
    }),
  })
  .then((res) => res.json())
  
  .catch((err) => {
    console.error("خطا در ثبت:", err);
  });
    },[])
  return (
    <>
    <div className='title'>
                   <p>{title}</p>
                   
    <p>جستجوی</p>
</div>
    <div className='tie'>
        <input type="text" className='cxc' placeholder={place} value={filter}
                onChange={(e)=>setFilter(e.target.value)} />
    </div>
    </>
  )
}