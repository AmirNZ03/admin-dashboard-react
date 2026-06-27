import React, { useEffect, useState } from 'react'
import "./Element.css"
import products from "./sk";
import DeleteModal from './DeleteModal';
import Input from './Input';
import Order from './Order';
import Search from '../Search/Search';

export default function Element() {
const [filter,setFilter] = useState("")

  return (

   
    
    <div className='maxj'>
   <Search place={"نام محصول"} title={"محصولات"}   route="/api/products/search"
  filter={filter}
    setFilter={setFilter} />
   <Input/>
    <Order filter={filter}/>
    {/* <DeleteModal/> */}
    </div>
  
//     useEffect(()=>{
//       fetch("https://jsonplaceholder.typicode.com/comments")
//       .then(res=>res.json())
//       .then((datas)=>{
//         datas.map((data)=>{
// <p>{data.name}</p>
       
      // })
      // })
// <table>
// <tr>
//   <th>id</th>
//   <th>name</th>
//   <p>body</p>
// </tr>
// <tr>
//   <td>{data.id}</td>
//   <td>{data.name}</td>
//   <td>{data.body}</td>
// </tr>


// </table>

    //     })

    //   })
    // })


     

  )
}
