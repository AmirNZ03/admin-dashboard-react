import React, { useState } from 'react'
import "./Page.css"
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'
import products from "./zk"
// import {AiOutlineDollarCircle} from "react-icons"

import { MdOutlinePaid } from "react-icons/md";
import Users from './Users'
import Input from './Input'
import Search from '../Search/Search'
export default function Page() {
  const [filter,setFilter]=useState("")


  return (
    <div>
       <Search place={"نام کاربر یا شماره همراه کاربر"}   filter={filter} title={"کاربران"}
          setFilter={setFilter} route="/api/users/search"/>
                  <Input/>

      <Users filter={filter}/>

   
    </div>
  )
}
