"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProduct() {


  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    category: "لپتاپ",
  });

  const router = useRouter()

  const onChangeHandler = (event)=>{
    setFormData({...formData, [event.target.name]:event.target.value })
  }

  const onSubmitHandler = async (event)=>{
    event.preventDefault()
    
    try{
        const res = await fetch(`http://localhost:3001/api/products`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        if(res.ok){
            alert("product is successfully added")
            router.push("/products")
        }
    }catch(error){
        alert(`Error---> ${error}`)
    }
  }

  return (
    <div>
      <h1>Add new product</h1>
      <form onSubmit={onSubmitHandler}>
        <input onChange={onChangeHandler} type="text" name="title" placeholder="title" />
        <input onChange={onChangeHandler} type="number" name="price" placeholder="price" />
        <input onChange={onChangeHandler} type="text" name="image" placeholder="image url" />
        <textarea onChange={onChangeHandler} name="description" placeholder="description"></textarea>
        <select onChange={onChangeHandler} name="category">
          <option value="لپتاپ">لپتاپ</option>
          <option value="موبایل">موبایل</option>
          <option value="تبلت">تبلت</option>
        </select>

        <button type="sumbit">save product</button>
      </form>
    </div>
  );
}
